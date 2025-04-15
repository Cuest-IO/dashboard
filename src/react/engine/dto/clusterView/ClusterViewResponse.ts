import { DeviceInfo } from './DeviceInfo';
import { WorkloadsResponseInfo } from './WorkloadsInfo';
import { AccessStatuses } from '../nodes';

export interface ClusterViewItemResponse {
  device: string;
  info: DeviceInfo;
  time: number;
  workloads: Array<WorkloadsResponseInfo>;
  accessStatus: AccessStatuses;
  hostname: string;
  os: string;
  firstConnect?: number;
  lastConnect?: number;
  arch?: string;
  version?: string;
}

export type ClusterViewResponse = ClusterViewItemResponse[];
