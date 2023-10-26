import { AccessStatuses } from "./NodesResponse";

export interface NodeBody {
  id: string;
  accessibility?: AccessStatuses;
}
