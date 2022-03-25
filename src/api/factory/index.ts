import ServerApi from '../server';
import Api from '..';
import ClientApi from '../client';

export type ApiType = 'client' | 'server';

export default class ApiFactory {
  private static instance: ApiFactory;

  public static getInstance(): ApiFactory {
    if (!ApiFactory.instance) {
      this.instance = new ApiFactory();
    }

    return this.instance;
  }

  constructor() {
    ApiFactory.instance = this;
  }

  public getService(type: ApiType): Api {
    if (type === 'server') {
      return new ServerApi();
    } else {
      return new ClientApi();
    }
  }
}
