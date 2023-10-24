import { RepositoryClient } from "../clients/repository";
import {NodeBody, NodeItemResponse, NodesParams, NodesResponse} from "../dto/nodes";

export class NodesService {
    constructor(
      private readonly nodesRepository: RepositoryClient
    ) {}

  getList = async (options: NodesParams): Promise<NodesResponse> => {
    return this.nodesRepository.getList(options);
  };

  getOne = async (id: string): Promise<NodeItemResponse> => {
    return this.nodesRepository.getOne(id);
  };

  updateOne = async (id: string, body: NodeBody): Promise<NodeItemResponse> => {
    return this.nodesRepository.updateOne(id, body);
  };
}
