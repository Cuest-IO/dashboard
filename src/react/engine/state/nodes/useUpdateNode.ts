import {useMutation, useQueryClient} from '@tanstack/react-query';
import { useNodesService } from "./useNodesService";
import { NodeBody, NodeItemResponse } from "../../dto/nodes";

export const useMutateNodes = () => {
  const nodesService = useNodesService();
  const queryClient = useQueryClient()

  const mutation = useMutation<NodeItemResponse, unknown, NodeBody>((agent: NodeBody) => {
    const { id } = agent

    return nodesService.updateOne(id, agent)
  },
    {
      onSettled: () => [
        queryClient.invalidateQueries(['nodes']),
        queryClient.invalidateQueries(['clusterView'])
      ],
      onError: () => [queryClient.invalidateQueries(['nodes']), queryClient.invalidateQueries(['clusterView'])],
    });

  return mutation;
};
