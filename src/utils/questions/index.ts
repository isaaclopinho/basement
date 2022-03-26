import { Rounds } from 'services/types';
import clamp from 'utils/math';

export const getQuestionsNotAnswered = (rounds: Rounds) => {
  const { questions, answers } = rounds.round;

  if (answers.length === 0) {
    return questions;
  }

  const answersIds = answers.map((x) => x.question_id);

  return questions.filter((q) => !answersIds.includes(q.id));
};

export const getQuestionsStatus = (rounds: Rounds) => {
  const { questions, answers } = rounds.round;

  return {
    current: clamp(answers.length + 1, 1, questions.length),
    total: questions.length,
    corrects: answers.filter((x) => x.correct).length,
  };
};
