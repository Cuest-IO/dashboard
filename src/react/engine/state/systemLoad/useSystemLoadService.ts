import { useMemo } from "react";
import { SystemLoadService } from "../../services/systemLoadService";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";

export const useSystemLoadService = (): SystemLoadService => {
  const service = useMemo(() => {
    return new SystemLoadService(new RepositoryClient(ApiClient, 'devices/system-load'))
  }, [])

  return service
}
