import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { addNode, updateNode } from "../../helpers/nodesStateUpdate";
import { uuid } from "../../helpers/uuid";
import { ClusterViewMessage } from "../../dto/clusterView";
import { ClusterViewNode } from "../../helpers/nodesStateUpdate";

const useClusterViewWebsocket = (wsState: boolean, setWsState: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient()
  const websocket = useRef<WebSocket | null>(null)
  const pingConnection = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (!wsState) {
      if (pingConnection.current) clearInterval(pingConnection.current)
    }
  }, [wsState])

  useEffect(() => {
    return () => {
      try {
        if (pingConnection.current) clearInterval(pingConnection.current)
        websocket.current?.close()
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const createWebsocketConnection = async () => {
    websocket.current = new WebSocket("wss://".concat("socket.cuest.io?type=web&token=").concat((await Auth.currentSession()).getIdToken().getJwtToken()));

    websocket.current.onopen = () => {
      pingConnection.current = setInterval(() => {
        websocket.current?.send(`{\"msg_id\":\"${uuid()}\",\"action\":\"ap\",\"command\":\"ping\", \"timestamp\":${Date.now()}`)
      }, 60 * 1000)

      setWsState(true);
    };

    websocket.current.onclose = () => {
      setWsState(false);
    }

    websocket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.command === 'pong') {
        return
      }
      queryClient.setQueryData<Map<string, ClusterViewNode>>(['clusterView'], (oldNodes) => {
        const nodeStat = { ...message } as ClusterViewMessage
        const nodes = new Map(oldNodes)
        const node: ClusterViewNode | undefined = oldNodes?.get(nodeStat.device);

        let updatedNode;
        if (node) {
          updatedNode = updateNode(node, nodeStat);
        } else {
          updatedNode = addNode(nodeStat, oldNodes as Map<string, ClusterViewNode>);
        }

        switch (updatedNode?.status) {
          case 'Initializing':
          case 'Fatal':
            updatedNode.workloads = [];
        }

        if (updatedNode?.connected) {
          nodes.set(updatedNode.nodeId, updatedNode);
        } else if (updatedNode?.nodeId) {
          nodes.delete(updatedNode.nodeId);
        }
        return nodes
      })
    }
  }

  return { createWebsocketConnection, websocket: websocket.current }
}

export default useClusterViewWebsocket
