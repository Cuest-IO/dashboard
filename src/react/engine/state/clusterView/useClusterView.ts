import { useQuery } from '@tanstack/react-query';
import { useClusterViewService } from "./useClusterViewService";
import { ClustersResponse } from "../../dto/clusters";

export function useClusters() {
  const clusterViewService = useClusterViewService();

  const response = useQuery<unknown, unknown, ClustersResponse>({
    queryKey: ['clusterView'],
    queryFn: async () =>
      clusterViewService.getList({}),
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: false
  });
  return response;
};
