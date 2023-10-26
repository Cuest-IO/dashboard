import { RepositoryClient } from "../clients/repository";
import { ClusterViewParams, ClusterViewResponse, ClusterViewItemResponse } from "../dto/clusterView";

export class ClusterViewService {
  constructor(
    private readonly clusterViewRepository: RepositoryClient
  ) {}

  async getList(options: ClusterViewParams): Promise<ClusterViewResponse> {
    return this.clusterViewRepository.getList<ClusterViewParams, ClusterViewItemResponse>(options);
  };

  async getOne (id: string): Promise<ClusterViewItemResponse> {
    return this.clusterViewRepository.getOne<ClusterViewItemResponse, ClusterViewParams>(id);
  };
}
