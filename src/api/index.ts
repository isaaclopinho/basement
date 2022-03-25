import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export type Payload = Record<string, unknown> | null | undefined;

export default abstract class Api {
  protected connection: AxiosInstance;

  constructor(baseURL: string) {
    const config: AxiosRequestConfig = { timeout: 3000, baseURL };

    this.connection = axios.create({
      ...config,
    });

    this.connection.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  handleError(error: AxiosError): Promise<never> {
    return Promise.reject(error);
  }

  abstract get(
    path: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract delete(
    path: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract patch(
    path: string,
    payload: Payload,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract put(
    path: string,
    payload: Payload,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract post(
    path: string,
    payload: Payload,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract request(
    path: string,
    payload: Payload,
    options: AxiosRequestConfig
  ): Promise<AxiosResponse>;

  abstract headers(): Record<string, string | number | boolean>;
}
