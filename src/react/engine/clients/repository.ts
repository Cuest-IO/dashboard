import { ApiAxiosClient } from "./axios";

export class RepositoryClient {
  constructor(
    private readonly apiClient: ApiAxiosClient,
    private readonly endpoint: string,
  ) {}

  async getList<TParams, TData>(params: TParams): Promise<TData[]> {
    const response = await this.apiClient.get<TData[]>(this.endpoint, { params })

    return response
  }

  async getOne<TParams, TData>(params: TParams): Promise<TData> {
    const response = await this.apiClient.get<TData>(this.endpoint, { params })

    return response
  }
}
