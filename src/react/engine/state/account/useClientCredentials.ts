import { useQuery } from '@tanstack/react-query';
import { useAccountService } from "./useAccountService";
import { ClientCredentialsResponse } from "../../dto/account";

export const useClientAccessData = () => {
  const accountService = useAccountService();

  const query = useQuery<unknown, unknown, ClientCredentialsResponse>({
    queryKey: ['account/client-access-data'],
    queryFn: async () => accountService.getClientAccessData(),
    keepPreviousData: false,
    cacheTime: 0,
    staleTime: 0,
    retry: false,
    initialData: {},
    refetchOnWindowFocus: false,
  });

  return query;
};
