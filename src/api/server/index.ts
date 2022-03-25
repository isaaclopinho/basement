import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Api, { Payload } from '..';

export default class ServerApi extends Api {
  constructor() {
    super(process.env.GAME_API_BASE_URL);
  }

  get(path: string, options = {}): Promise<AxiosResponse> {
    return this.request(path, null, { ...options, method: 'GET' });
  }

  delete(path: string, options = {}): Promise<AxiosResponse> {
    return this.request(path, null, { ...options, method: 'DELETE' });
  }

  patch(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    return this.request(path, payload, { ...options, method: 'PATCH' });
  }

  put(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    return this.request(path, payload, { ...options, method: 'PUT' });
  }

  post(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    return this.request(path, payload, { ...options, method: 'POST' });
  }

  request(
    path: string,
    payload: Payload,
    options: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      responseType: 'json',
      url: path,
      data: payload,
      ...options,
      headers: { ...options?.headers, ...this.headers() },
    };

    return this.connection.request(config);
  }

  headers(): Record<string, string | number | boolean> {
    return {};
  }
}
