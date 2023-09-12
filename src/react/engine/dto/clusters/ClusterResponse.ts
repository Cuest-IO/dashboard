export interface ClusterResponse {
  id: string;
  created_at: number;
  last_connected_at: number;
  is_connected: boolean;
}

export type ClustersResponse = ClusterResponse[]
