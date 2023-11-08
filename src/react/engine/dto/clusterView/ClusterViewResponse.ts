import { DeviceInfo } from "./DeviceInfo";
import { WorkloadsResponseInfo } from "./WorkloadsInfo";
import { AccessStatuses } from "../nodes";

export interface ClusterViewItemResponse {
  device: string;
  info: DeviceInfo
  time: number;
  workloads: Array<WorkloadsResponseInfo>;
  accessibility: AccessStatuses
}

export type ClusterViewResponse = ClusterViewItemResponse[]
