import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { addNode, updateNode } from "./nodesStateUpdate";
import { uuid } from "./uuid";

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient()
  const [wsState, setWsState] = useState(false)
  const websocket = useRef(null)
  const pingConnection = useRef(null)

  const wsClient = async () => {
    websocket.current = new WebSocket("wss://".concat("socket.cuest.io?type=web&token=").concat((await Auth.currentSession()).getIdToken().getJwtToken()));

    websocket.current.onopen = (e) => {
      pingConnection.current = setInterval(() => {
        websocket.current.send(`{\"msg_id\":\"${uuid()}\",\"action\":\"ap\",\"command\":\"ping\", \"timestamp\":${Date.now()}`)
      }, 60 * 1000)

      setWsState(true);

      queryClient.setQueryData(['websocket'], () => new Map())
    };

    websocket.current.onclose = () => {
      console.log('ws closed', websocket);
      setWsState(false);
    }

    websocket.current.onmessage = e => {
      const nodeStat = JSON.parse(e.data);
      if (nodeStat.command === 'pong') {
        return
      }
      queryClient.setQueryData(['websocket'], (oldNodes) => {
        const nodes = new Map(oldNodes)
        const node = oldNodes.get(nodeStat.device);
        console.log('node', node)
        let updatedNode;
        if (node) {
          updatedNode = updateNode(node, nodeStat);
        } else {
          updatedNode = addNode(nodeStat, oldNodes);
        }

        console.log('updatedNode', updatedNode)

        switch (updatedNode?.status) {
          case 'Initializing':
          case 'Fatal':
            updatedNode.workloads = [];
        }

        if (updatedNode?.connected) {
          nodes.set(updatedNode.nodeId, updatedNode);
        } else {
          nodes.delete(updatedNode?.nodeId);
        }
        return nodes
      })
    }
  }

  const createNewConnection = () => {
    if (websocket.current.readyState === 3) {
      clearInterval(pingConnection.current)
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
        clearInterval(pingConnection.current)
        websocket.current.close()
        setWsState(false)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return queryClient
}

export default useReactQuerySubscription
