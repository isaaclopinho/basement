/* eslint-disable class-methods-use-this */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

export type Payload = Record<string, unknown> | null | undefined;

export abstract class AxiosConnection {
  connectionURL: string;

  service: AxiosInstance;

  constructor(connectionURL: string) {
    this.connectionURL = connectionURL;

    const config: AxiosRequestConfig = {
      timeout: 3000,
      baseURL: connectionURL,
    };

    this.service = axios.create({ ...config });
    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  handleError(error: AxiosError): Promise<never> {
    const { response } = error;
    const { status, data } = response ?? {};

    const err = { status, data, _hasError: true };
    return Promise.reject(err);
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  headers(): AxiosRequestHeaders {
    return {};
  }
}
