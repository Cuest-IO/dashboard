import { useQuery } from '@tanstack/react-query';
import { useAccountService } from "./useAccountService";
import { AccountStatusResponse } from "../../dto/account";

export const useAccountStatus = () => {
  const accountService = useAccountService();

  const query = useQuery<unknown, unknown, AccountStatusResponse>({
    queryKey: ['account/status'],
    queryFn: async () => accountService.getStatus(),
    keepPreviousData: true,
    staleTime: 0,
    retry: false,
    initialData: '',
    refetchOnWindowFocus: false,
  });

  return query;
};
