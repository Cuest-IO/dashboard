import { useQuery } from '@tanstack/react-query';
import { useSystemLoadService } from "./useSystemLoadService";
import { SystemCapacityState } from "../../dto/systemLoad";
import {formatMBytes} from "../../helpers/utilities";

export const useSystemLoad = () => {
  const systemLoadService = useSystemLoadService();

  const query = useQuery<unknown, unknown, SystemCapacityState>({
    queryKey: ['systemLoad'],
    queryFn: async () => {
      const info = await systemLoadService.getRecord()

      const cpuFree = info?.load?.cpu && info?.system?.cpu ? info.system.cpu - info.system.cpu * info.load.cpu : 0
      const cpuUsed = info?.load?.cpu && info?.system?.cpu ? info.system.cpu * info.load.cpu : 0
      const memoryUsed = info?.load?.ram && info.system?.ram ? info.load.ram * info.system.ram : 0
      const memoryFree = info?.system?.ram && memoryUsed ? info.system.ram - memoryUsed : 0

      const capacity: SystemCapacityState = {
        cpu: {
          free: cpuFree,
          used: cpuUsed,
        },
        memory: {
          free: formatMBytes(memoryFree),
          used: formatMBytes(memoryUsed),
        }
      }

      return capacity
    },
    keepPreviousData: true,
    staleTime: 0, // TODO: fix or update
    retry: false,
    initialData: []
  });

  return query;
};
