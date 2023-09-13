import { DeviceInfo } from "./DeviceInfo";
import { K8sInfo } from "./K8sInfo";

export interface ClusterViewMessage {
  device: string;
  info: DeviceInfo;
  time: number;
  k8s: K8sInfo;
}






