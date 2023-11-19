import { AccessStatuses } from "./AccessStatuses";

export interface NodeItemResponse {
  id: string;
  created_at: number;
  last_connected_at: number;
  is_connected: boolean;
  accessStatus?: AccessStatuses;
  cpu?: number;
  ram?: number;
  disk?: number;
}

export type NodesResponse = NodeItemResponse[]
