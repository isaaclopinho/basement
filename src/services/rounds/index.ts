import ApiFactory, { ApiType } from '../../api/factory';

export type PostRoundsPayload = {
  round: {
    player_name: string;
    category_id: number;
  };
};

export type PostAnswerRoundsPayload = {
  answer: {
    question_id: number;
    option_id: number;
  };
};

export const getRounds = async (id: number, type: ApiType = 'server') => {
  try {
    const response = await ApiFactory.getInstance()
      .getService(type)
      .get(`/rounds/${id.toString()}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRoundsResults = async (
  id: number,
  type: ApiType = 'server'
) => {
  try {
    const response = await ApiFactory.getInstance()
      .getService(type)
      .get(`/rounds/${id.toString()}/result`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postRounds = async (
  payload: PostRoundsPayload,
  type: ApiType = 'server'
) => {
  try {
    const response = await ApiFactory.getInstance()
      .getService(type)
      .post(`/rounds/`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postAnswerRounds = async (
  id: number,
  payload: PostAnswerRoundsPayload,
  type: ApiType = 'server'
) => {
  try {
    const response = await ApiFactory.getInstance()
      .getService(type)
      .post(`/rounds/${id.toString()}/answers`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
