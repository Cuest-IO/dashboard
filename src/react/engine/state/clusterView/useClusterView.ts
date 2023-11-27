import {QueryFunction, useQuery, useQueryClient} from '@tanstack/react-query';
import { useClusterViewService } from "./useClusterViewService";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {addNode, ClusterViewNode, filterOutAbsentData, updateNode} from "../../helpers/nodesStateUpdate";
import {useCallback, useEffect, useState} from "react";
import useWebsocket from "../websocket/useWebsocket";

export const useClusterView = ({ isUserAuthLoaded }: { isUserAuthLoaded: boolean }) => {
  const queryClient = useQueryClient()
  const [isWebsocketEnabled, setIsWebsocketEnabled] = useState<boolean>(false);
  const clusterViewService = useClusterViewService();
  const { user } = useAuthenticator();
  const { createWebsocketConnection, websocket } = useWebsocket(isWebsocketEnabled, setIsWebsocketEnabled)

  const createNewConnectionIfInterrupted = useCallback(() => {
    if (websocket?.readyState === 3) {
      setIsWebsocketEnabled(false)
      query.refetch()
    }
  }, [websocket, websocket?.readyState])

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

  const queryFn: QueryFunction = useCallback(async () => {
    const initData = queryClient.getQueryData<Map<string, ClusterViewNode>>(['clusterView']) || new Map() as Map<string, ClusterViewNode>
    if (isUserAuthLoaded && !user || !isUserAuthLoaded) {
      return new Map()
    }

    return clusterViewService.getList({}).then(clusterViewResponse => {
      const nodes = clusterViewResponse.reduce(
        (acc: Map<string, ClusterViewNode>, clusterViewNode) => {
          const node: ClusterViewNode | undefined = acc?.get(clusterViewNode.device);

          let updatedNode;
          if (node) {
            updatedNode = updateNode(node, clusterViewNode);
          } else {
            updatedNode = addNode(clusterViewNode, acc as Map<string, ClusterViewNode>)
          }
          
          if (updatedNode?.connected) {
            acc.set(updatedNode.nodeId, updatedNode);
          } else if (!updatedNode || !updatedNode?.connected || !updatedNode?.status) {
            nodes.delete(clusterViewNode.device)
          }
          return acc
        }, new Map(filterOutAbsentData<ClusterViewNode>(initData, clusterViewResponse)))

      createWebsocketConnection()
      return nodes
    }).catch(createWebsocketConnection) // TODO: fix temp
  }, [clusterViewService, websocket, isUserAuthLoaded, user])

  const query = useQuery<unknown, unknown, Map<string, ClusterViewNode>>({
    queryKey: isUserAuthLoaded && user ? ['clusterView'] : ['clusterView', 'nonAuth'],
    queryFn,
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: 2,
    refetchOnWindowFocus: false,
    initialData: new Map(),
    cacheTime: 0,
  });

  return query;
};
