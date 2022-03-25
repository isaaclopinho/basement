import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosConnection, Payload } from './connection';
import { GameConnection } from './game-connection';

export default class Api {
  private connection: AxiosConnection;

  private static instance: Api;

  public static getInstance(): Api {
    if (this.instance == null) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.connection = new GameConnection();
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
      headers: { ...options?.headers, ...this.connection.headers() },
    };

    return this.connection.service.request(config);
  }
}
