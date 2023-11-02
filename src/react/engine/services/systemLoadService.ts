import { RepositoryClient } from "../clients/repository";
import { SystemLoadResponse } from "../dto/systemLoad";

export class SystemLoadService {
  constructor(
    private readonly systemLoadRepository: RepositoryClient
  ) {}

  async getRecord (): Promise<SystemLoadResponse> {
    return this.systemLoadRepository.getRecord<SystemLoadResponse, null>();
  };
}
