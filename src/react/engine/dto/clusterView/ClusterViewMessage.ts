import { DeviceInfo } from "./DeviceInfo";
import { WorkloadsMessageInfo } from "./WorkloadsInfo";
import { AccessStatuses } from "../nodes";

export interface ClusterViewMessage {
  device: string;
  info: DeviceInfo;
  time: number;
  workload: WorkloadsMessageInfo;
  accessStatus: AccessStatuses;
  hostname: string;
  os: string;
}






