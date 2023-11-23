import { ClusterViewMessage } from "../../dto/clusterView";
import { addNode, ClusterViewNode, updateNode } from "../../helpers/nodesStateUpdate";
import { QueryClient } from "@tanstack/react-query";

export const handleClusterViewWebsocketEvent = (message: ClusterViewMessage, queryClient: QueryClient) => {
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

    // switch (updatedNode?.status) {
    //   case 'Initializing':
    //   case 'Fatal':
    //     updatedNode.workloads = [];
    // }

    if (updatedNode?.connected) {
      nodes.set(updatedNode.nodeId, updatedNode);
    } else if (!updatedNode || !updatedNode?.connected || !updatedNode?.status) {
      nodes.delete(nodeStat.device)
    }
    return nodes
  })
}
