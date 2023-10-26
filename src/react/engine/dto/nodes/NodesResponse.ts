import { AccessStatuses } from "./AccessStatuses";

export interface NodeItemResponse {
  id: string;
  created_at: number;
  last_connected_at: number;
  is_connected: boolean;
  accessibility?: AccessStatuses;
  cpu?: number;
  ram?: number;
  disk?: number;
}

export type NodesResponse = NodeItemResponse[]
