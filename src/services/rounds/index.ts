import Api from '../../api';

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

export const getRounds = async (id: number) => {
  try {
    const response = await Api.getInstance().get(`/rounds/${id.toString()}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRoundsResults = async (id: number) => {
  try {
    const response = await Api.getInstance().get(
      `/rounds/${id.toString()}/result`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postRounds = async (payload: PostRoundsPayload) => {
  try {
    const response = await Api.getInstance().post(`/rounds/`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postAnswerRounds = async (
  id: number,
  payload: PostAnswerRoundsPayload
) => {
  try {
    const response = await Api.getInstance().post(
      `/rounds/${id.toString()}/answers`,
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
