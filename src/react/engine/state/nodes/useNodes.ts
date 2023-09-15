import { useQuery } from '@tanstack/react-query';
import { useNodesService } from "./useNodesService";
import { NodesResponse } from "../../dto/nodes";

export const useNodes = () => {
  const nodesService = useNodesService();

  const query = useQuery<unknown, unknown, NodesResponse>({
    queryKey: ['nodes'],
    queryFn: async () => nodesService.getList({}),
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: false,
    initialData: []
  });

  return query;
};
