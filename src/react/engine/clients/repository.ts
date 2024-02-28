import { ApiAxiosClient } from "./axios";

export class RepositoryClient {
  constructor(
    private readonly apiClient: ApiAxiosClient,
    private readonly resource: string,
  ) {}

  async getList<TParams, TData>(params: TParams): Promise<TData[]> {
    const response = await this.apiClient.get<TData[]>(this.resource, { params })

    return response
  }

  async getOne<TData, TParams>(id: string, params?: TParams): Promise<TData> {
    const response = await this.apiClient.get<TData>(`${this.resource}/${id}`, { params })

    return response
  }

  async updateOne<TBody, TData>(id: string, body: TBody): Promise<TData> {
    const response = await this.apiClient.put<TData, TBody>(`${this.resource}/${id}`, body)

    return response
  }

  async getRecord<TData, TParams>(params?: TParams, endpoint = ''): Promise<TData> {
    const response = await this.apiClient.get<TData>(`${this.resource}${endpoint}`, { params })

    return response
  }
}
