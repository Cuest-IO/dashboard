import { useMemo } from "react";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";
import { InstallerService } from "../../services/installerService";

export const useInstallerService = (): InstallerService => {
  const service = useMemo(() => {
    return new InstallerService(new RepositoryClient(ApiClient, 'installer'))
  }, [])

  return service
}