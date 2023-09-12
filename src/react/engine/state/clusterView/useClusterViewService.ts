import { useMemo } from "react";
import { ClusterViewService } from "../../services/clusterViewService";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";

export function useClusterViewService(): ClusterViewService {
  const service = useMemo(() =>
    new ClusterViewService(new RepositoryClient(ApiClient, 'devices/cluster-view')), [])

  return service
}
