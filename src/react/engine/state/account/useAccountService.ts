import { useMemo } from "react";
import { RepositoryClient } from "../../clients/repository";
import ApiClient from "../../clients/axios";
import { AccountService } from "../../services/accountService";

export const useAccountService = (): AccountService => {
  const service = useMemo(() => {
    return new AccountService(new RepositoryClient(ApiClient, 'account'))
  }, [])

  return service
}
