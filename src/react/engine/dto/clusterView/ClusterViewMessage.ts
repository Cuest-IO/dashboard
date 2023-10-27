import { DeviceInfo } from "./DeviceInfo";
import { K8sInfo } from "./K8sInfo";
import { AccessStatuses } from "../nodes";

export interface ClusterViewMessage {
  device: string;
  info: DeviceInfo;
  time: number;
  k8s: K8sInfo;
  accessibility: AccessStatuses
}






