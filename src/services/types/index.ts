export type Question = {
  id: number;
  description: string;
  options: { id: number; label: string }[];
};

export type Answer = {
  id: number;
  question_id: number;
  option_id: number;
  correct: boolean;
};

export type Rounds = {
  round: {
    id: number;
    player_id: number;
    questions: Question[];
    answers: Answer[];
  };
};

export type Category = {
  id: number;
  name: string;
};

export type Results = {
  round: {
    id: number;
    player_id: number;
    total_answered_questions: number;
    total_correct_answers: number;
    total_questions: number;
  };
};
