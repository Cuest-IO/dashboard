import { RepositoryClient } from "../clients/repository";
import { NodeItemResponse, NodesParams, NodesResponse } from "../dto/nodes";

export class NodesService {
    constructor(
      private readonly nodesRepository: RepositoryClient
    ) {}

  getList = async (options: NodesParams): Promise<NodesResponse> => {
    return this.nodesRepository.getList(options);
  };

  getOne = async (id: number): Promise<NodeItemResponse> => {
    return this.nodesRepository.getOne(id);
  };
}
