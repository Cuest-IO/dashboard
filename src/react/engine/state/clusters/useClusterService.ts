import { useMemo } from "react";
import { ClusterService } from "../../services/clusterService";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";

export function useClusterService(): ClusterService {
  const service = useMemo(() =>
    new ClusterService(new RepositoryClient(ApiClient, 'devices/cluster')), [])

  return service
}
