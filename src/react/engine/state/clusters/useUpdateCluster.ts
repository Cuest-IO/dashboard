import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useClusterService } from "./useClusterService";
import { ClusterBody, ClusterResponse } from "../../dto/clusters";

export const useMutateCluster = () => {
  const clusterService = useClusterService();
  const queryClient = useQueryClient()

  const mutation = useMutation<ClusterResponse, unknown, ClusterBody & { id: string }>((cluster) => {
      const { id, ...body } = cluster

      return clusterService.updateOne(id, body)
    },
    {
      onSuccess: () => [
        queryClient.invalidateQueries(['clusters']),
      ],
      onError: () => [queryClient.invalidateQueries(['nodes'])],
    });

  return mutation;
};
