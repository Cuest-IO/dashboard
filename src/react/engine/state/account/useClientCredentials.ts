import { useQuery } from '@tanstack/react-query';
import { useAccountService } from "./useAccountService";
import { ClientCredentialsResponse } from "../../dto/account";

export const useClientCredentials = () => {
  const accountService = useAccountService();

  const query = useQuery<unknown, unknown, ClientCredentialsResponse>({
    queryKey: ['account/client-credentials'],
    queryFn: async () => accountService.getClientCredentials(),
    keepPreviousData: false,
    cacheTime: 0,
    staleTime: 0,
    retry: false,
    initialData: {},
    refetchOnWindowFocus: false,
  });

  return query;
};
