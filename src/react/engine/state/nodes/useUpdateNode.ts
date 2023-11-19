import {useMutation, useQueryClient} from '@tanstack/react-query';
import { useNodesService } from "./useNodesService";
import { NodeBody, NodeItemResponse } from "../../dto/nodes";

export const useMutateNodes = () => {
  const nodesService = useNodesService();
  const queryClient = useQueryClient()

  const mutation = useMutation<NodeItemResponse, unknown, NodeBody & { id: string }>((agent) => {
    const { id, ...body } = agent

    return nodesService.updateOne(id, body)
  },
    {
      onSuccess: () => [
        queryClient.invalidateQueries(['nodes']),
        queryClient.invalidateQueries(['clusterView'])
      ],
      onError: () => [queryClient.invalidateQueries(['nodes']), queryClient.invalidateQueries(['clusterView'])],
    });

  return mutation;
};
