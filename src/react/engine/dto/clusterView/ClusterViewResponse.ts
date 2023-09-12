import { DeviceInfo } from "./DeviceInfo";

export interface ClusterViewItemResponse {
  device: string;
  info: DeviceInfo
  time: number;
}

export type ClusterViewResponse = ClusterViewItemResponse[]
