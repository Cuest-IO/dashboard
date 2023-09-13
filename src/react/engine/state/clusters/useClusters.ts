import { useQuery } from '@tanstack/react-query';
import { useClusterService } from "./useClusterService";
import { ClustersResponse } from "../../dto/clusters";

export function useClusters() {
  const clusterService = useClusterService();

  const response = useQuery<unknown, unknown, ClustersResponse>({
    queryKey: ['clusters'],
    queryFn: async () =>
      clusterService.getList({}),
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: false,
    initialData: []
  });
  return response;
};
