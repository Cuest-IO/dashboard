import { RepositoryClient } from "../clients/repository";
import { ClusterResponse, ClustersResponse, ClusterParams } from "../dto/clusters";

export class ClusterService {
  constructor(
    private readonly clusterRepository: RepositoryClient
  ) {}

  async getList(options: ClusterParams): Promise<ClustersResponse> {
    return this.clusterRepository.getList<ClusterParams, ClusterResponse>(options);
  };

  async getOne (id: string): Promise<ClusterResponse> {
    return this.clusterRepository.getOne<ClusterParams, ClusterResponse>(id);
  };
}
