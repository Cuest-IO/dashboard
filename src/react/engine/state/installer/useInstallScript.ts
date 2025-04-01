import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useInstallerService } from "./useInstallerService";
import { InstallScriptParams } from '../../dto/installer';

export const useInstallScript = (params: InstallScriptParams, options?: Partial<UseQueryOptions<string>>) => {
  const installerService = useInstallerService();

  const query = useQuery<string>({
    queryKey: ['installer/script'],
    queryFn: async () => installerService.getInstallScriptPreSignedUrl(params),
    keepPreviousData: true,
    staleTime: 0,
    retry: false,
    initialData: '',
    refetchOnWindowFocus: false,
    ...options,
  });

  return query;
};