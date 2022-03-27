import { Results, Rounds } from 'services/types';
import clamp from 'utils/math';

export const getQuestionsNotAnswered = (rounds: Rounds) => {
  try {
    const { questions, answers } = rounds.round;

    if (answers.length === 0) {
      return questions;
    }

    const answersIds = answers.map((x) => x.question_id);

    return questions.filter((q) => !answersIds.includes(q.id));
  } catch (e) {
    return [];
  }
};

export const getQuestionsStatus = (rounds: Rounds) => {
  try {
    const { questions, answers } = rounds.round;

    return {
      current: clamp(answers.length + 1, 1, questions.length),
      total: questions.length,
      corrects: answers.filter((x) => x.correct).length,
    };
  } catch (e) {
    return {
      current: 0,
      total: 0,
      corrects: 0,
    };
  }
};

export const calculateStarsByPercentage = (p: number) => {
  const intervals = [
    { min: 0, max: 0.33, stars: 0 },
    { min: 0.33, max: 0.66, stars: 1 },
    { min: 0.66, max: 0.95, stars: 2 },
    { min: 0.95, max: 1, stars: 3 },
  ];

  for (let i = 0; i < intervals.length; i += 1) {
    if (p > intervals[i].min && p <= intervals[i].max) {
      return intervals[i].stars;
    }
  }

  return 0;
};

export const getResultsPoints = (results: Results) => {
  try {
    const { total_correct_answers, total_questions } = results.round;

    const percentage =
      total_questions > 0 ? total_correct_answers / total_questions : 0;

    return {
      percentage,
      stars: calculateStarsByPercentage(percentage),
    };
  } catch (e) {
    return {
      percentage: 0,
      stars: 0,
    };
  }
};
