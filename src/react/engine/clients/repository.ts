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

  async getOne<TData, TParams>(id: string, params?: TParams): Promise<TData> {
    const response = await this.apiClient.get<TData>(`${this.endpoint}/${id}`, { params })

    return response
  }

  async updateOne<TBody, TData>(id: string, body: TBody): Promise<TData> {
    const response = await this.apiClient.put<TData, TBody>(`${this.endpoint}/${id}`, body)

    return response
  }
}
