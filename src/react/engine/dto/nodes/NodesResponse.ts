import { AccessStatuses } from "./AccessStatuses";
import { Resources } from "../common";

export interface NodeItemResponse {
  id: string;
  created_at: number;
  last_connected_at: number;
  is_connected: boolean;
  accessStatus?: AccessStatuses;
  device?: Resources;
  vm?: Resources;
}

export type NodesResponse = NodeItemResponse[]
