import { useQuery } from '@tanstack/react-query';
import { useClusterViewService } from "./useClusterViewService";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { addNode, ClusterViewNode } from "../../helpers/nodesStateUpdate";
import { useEffect, useState } from "react";
// import useClusterViewWebsocket from "./useClusterViewWebsocket";
import useWebsocket from "../websocket/useWebsocket";

export const useClusterView = ({ isUserAuthLoaded }: { isUserAuthLoaded: boolean }) => {
  const [isWebsocketEnabled, setIsWebsocketEnabled] = useState<boolean>(false);
  const clusterViewService = useClusterViewService();
  const { user } = useAuthenticator();
  const { createWebsocketConnection, websocket } = useWebsocket(isWebsocketEnabled, setIsWebsocketEnabled)

  const createNewConnectionIfInterrupted = () => {
    if (websocket?.readyState === 3) {
      setIsWebsocketEnabled(false)
      query.refetch()
    }
  }

  const reconnectWebsocket = () => {
    websocket?.close()
    createWebsocketConnection()
  }

  useEffect(() => {
    if (!isWebsocketEnabled) {
      window.addEventListener('online', createNewConnectionIfInterrupted)
    }

    return () => {
      window.removeEventListener('online', createNewConnectionIfInterrupted)
    }
  }, [isWebsocketEnabled])

  useEffect(() => {
    return () => {
      setIsWebsocketEnabled(false)
    }
  }, [])

  useEffect(() => {
    if (isUserAuthLoaded && user) query.refetch()
  }, [isUserAuthLoaded, user])

  const query = useQuery<unknown, unknown, Map<string, ClusterViewNode>>({
    queryKey: isUserAuthLoaded && user ? ['clusterView'] : ['clusterView', 'nonAuth'],
    queryFn: async () => {

      if (isUserAuthLoaded && !user || !isUserAuthLoaded) {
        return new Map()
      }

      return clusterViewService.getList({}).then(clusterViewResponse => {
        const nodes = clusterViewResponse.reduce(
          (acc: Map<string, ClusterViewNode>, clusterViewNode) => {
            const updatedNode = addNode(clusterViewNode, acc as Map<string, ClusterViewNode>)
            if (updatedNode?.connected) {
              acc.set(updatedNode.nodeId, updatedNode);
            }
            return acc
          }, new Map())

        // createWebsocketConnection()
        reconnectWebsocket()

        return nodes
      }).catch(reconnectWebsocket) // TODO: fix temp
    },
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: 2,
    refetchOnWindowFocus: false,
    initialData: new Map()
  });

  return query;
};
