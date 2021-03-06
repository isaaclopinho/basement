import Api from 'api';

export default async () => {
  try {
    const response = await Api.getInstance().get('/categories');
    return response.data;
  } catch (error) {
    return error;
  }
};
