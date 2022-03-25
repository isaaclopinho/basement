import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Api, { Payload } from '..';

export default class ClientApi extends Api {
  constructor() {
    super(process.env.NEXT_PUBLIC_PROXY_API_BASE_URL);
  }

  get(path: string, options = {}): Promise<AxiosResponse> {
    const params = {
      _path: path,
      _method: 'GET',
    };

    return this.request(null, null, { ...options, params });
  }

  delete(path: string, options = {}): Promise<AxiosResponse> {
    const params = {
      _path: path,
      _method: 'DELETE',
    };

    return this.request(null, null, { ...options, params });
  }

  patch(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    const params = {
      _path: path,
      _method: 'PATCH',
    };

    return this.request(null, payload, { ...options, params });
  }

  put(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    const params = {
      _path: path,
      _method: 'PUT',
    };

    return this.request(null, payload, { ...options, params });
  }

  post(path: string, payload: Payload, options = {}): Promise<AxiosResponse> {
    const params = {
      _path: path,
      _method: 'POST',
    };

    return this.request(null, payload, { ...options, params });
  }

  request(
    path: string,
    payload: Payload,
    options: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      url: '/proxy',
      responseType: 'json',
      method: 'POST',
      data: payload,
      ...options,
      headers: { ...options.headers, ...this.headers() },
    };

    console.log(config);

    return this.connection.request(config);
  }

  headers(): Record<string, string | number | boolean> {
    return {};
  }
}
