import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

export class ApiAxiosClient {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_REST_URI,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axios.interceptors.request.use(
      async config => {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        config.headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );
  }

  get = async <TData = unknown>(url: string, config?: AxiosRequestConfig<never>): Promise<TData> => {
    const response = await this.axios.get<TData>(url, config);

    return response.data;
  };

  put = async <TData = unknown, TBody = Record<string, any>>(
    url: string,
    data: TBody,
    config?: AxiosRequestConfig<never>,
  ): Promise<TData> => {
    const response = await this.axios.put<TData>(url, data, config);

    return response.data;
  };
}

export default new ApiAxiosClient();
