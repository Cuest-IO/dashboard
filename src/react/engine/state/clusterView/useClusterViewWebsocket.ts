import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { addNode, updateNode } from "../../helpers/nodesStateUpdate";
import { uuid } from "../../helpers/uuid";
import { ClusterViewMessage } from "../../dto/clusterView";
import { ClusterViewNode } from "../../helpers/nodesStateUpdate";

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient()
  const [wsState, setWsState] = useState(false)
  const websocket = useRef<WebSocket | null>(null)
  const pingConnection = useRef<NodeJS.Timer | null>(null)

  const wsClient = async () => {
    websocket.current = new WebSocket("wss://".concat("socket.cuest.io?type=web&token=").concat((await Auth.currentSession()).getIdToken().getJwtToken()));

    websocket.current.onopen = () => {
      pingConnection.current = setInterval(() => {
        websocket.current?.send(`{\"msg_id\":\"${uuid()}\",\"action\":\"ap\",\"command\":\"ping\", \"timestamp\":${Date.now()}`)
      }, 60 * 1000)

      setWsState(true);

      queryClient.setQueryData(['websocket'], () => new Map())
    };

    websocket.current.onclose = () => {
      setWsState(false);
    }

    websocket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.command === 'pong') {
        return
      }
      queryClient.setQueryData<Map<string, ClusterViewNode>>(['websocket'], (oldNodes) => {
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

  const createNewConnection = () => {
    if (websocket.current?.readyState === 3) {
      if (pingConnection.current) clearInterval(pingConnection.current)
      setWsState(false)
      wsClient();
    }
  }

  useEffect(() => {
    if (!wsState) {
      console.log("create connection");
      wsClient();
      window.addEventListener('online', createNewConnection)
    }

    return () => {
      window.removeEventListener('online', createNewConnection)
    }
  }, [queryClient, wsState])

  useEffect(() => {
    return () => {
      try {
        if (pingConnection.current) clearInterval(pingConnection.current)
        websocket.current?.close()
        setWsState(false)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return queryClient
}

export default useReactQuerySubscription
