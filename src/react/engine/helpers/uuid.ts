export function uuid(): string {
  return Math.random().toString(36).slice(-11);
}
