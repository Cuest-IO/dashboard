export interface NodeItemResponse {
  id: string;
  created_at: number;
  last_connected_at: number;
  is_connected: boolean;
  cpu?: number;
  ram?: number;
  disk?: number;
}

export type NodesResponse = NodeItemResponse[]
