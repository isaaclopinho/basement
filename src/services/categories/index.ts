import ApiFactory, { ApiType } from '../../api/factory';

export type Category = {
  id: number;
  name: string;
};

export const getCategories = async (type: ApiType = 'server') => {
  try {
    const response = await ApiFactory.getInstance()
      .getService(type)
      .get('/categories');
    return response.data;
  } catch (error) {
    return error;
  }
};
