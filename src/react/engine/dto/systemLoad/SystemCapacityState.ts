export interface SystemCapacityState {
  cpu: {
    free: number;
    used: number;
  };
  memory: {
    free: number;
    used: number;
  }
}
