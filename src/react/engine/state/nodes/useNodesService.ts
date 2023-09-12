import { useMemo } from "react";
import { NodesService } from "../../services/nodesService";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";

export const useNodesService = (): NodesService => {
  const service = useMemo(() => {
    return new NodesService(new RepositoryClient(ApiClient, 'devices/node'))
  }, [])

  return service
}
