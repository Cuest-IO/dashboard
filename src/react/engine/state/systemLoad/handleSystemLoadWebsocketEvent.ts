import { formatMBytes } from '../../../engine/helpers/utilities'
import { QueryClient } from "@tanstack/react-query";
import { SystemCapacityState, SystemLoadMessage } from "../../dto/systemLoad";


export const handleSystemLoadWebsocketEvent = (message: SystemLoadMessage, queryClient: QueryClient) => {
  queryClient.setQueryData<SystemCapacityState>(['systemLoad'], () => {
    const systemMessage = { ...message }
    const { info } = systemMessage
    const cpuFree = info?.load?.cpu && info?.system?.cpu ? info.system.cpu - info.system.cpu * info.load.cpu : 0
    const cpuUsed = info?.load?.cpu && info?.system?.cpu ? info.system.cpu * info.load.cpu : 0
    const memoryFree = info?.load?.ram && info?.system?.ram ? info.system.ram - info.system.ram * info.load.ram : 0
    const memoryUsed = info?.load?.ram && info?.system?.ram ? info.system.ram * info.load.ram : 0

    const capacity = {
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
  })
}
