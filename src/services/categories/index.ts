import Api from '../../api';

export type Category = {
  id: number;
  name: string;
};

export const getCategories = async () => {
  try {
    const response = await Api.getInstance().get('/categories');
    return response.data;
  } catch (error) {
    return error;
  }
};
