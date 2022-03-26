import React, { useMemo, useState } from 'react';
import { getRounds } from 'services/rounds';
import { Rounds } from 'services/types';
import Layout from 'components/templates/layout';
import clamp from 'utils/math';

export interface RoundsProps {
  rounds: Rounds;
}

const getQuestionsNotAnswered = (rounds: Rounds) => {
  const { questions, answers } = rounds.round;

  if (answers.length === 0) {
    return questions;
  }

  return questions.filter(
    (q) => !answers.map((x) => x.question_id).includes(q.id)
  );
};

const getQuestionsStatus = (rounds: Rounds) => {
  const { questions, answers } = rounds.round;

  return {
    currentQuestion: clamp(answers.length + 1, 1, questions.length),
    total: questions.length,
  };
};

function RoundsPage({ rounds }: RoundsProps) {
  const [data, setData] = useState(rounds);
  const [loading, setLoading] = useState(false);
  const [alternativeSelected, setAlternativeSelected] = useState(-1);
  const currentQuestions = useMemo(() => getQuestionsNotAnswered(data), [data]);

  const status = useMemo(() => getQuestionsStatus(data), [data]);

  const answeredAll = currentQuestions.length === 0;

  if (answeredAll) {
    return <div>Respondeu tudo</div>;
  }

  return (
    <Layout title="Quiz App">
      <div>
        <h1>{`Round id: ${rounds.round.id}`}</h1>
        <h1>{`${status.currentQuestion} / ${status.total}`}</h1>
        <h1>{`Round player_id: ${rounds.round.player_id}`}</h1>
        <p>{`Question description: ${currentQuestions[0].description}`}</p>
        <p>{`Question id: ${currentQuestions[0].id}`}</p>
        {currentQuestions[0].options.map((op, index) => (
          <button
            type="button"
            key={op.id}
            onClick={() => console.log(op.label)}
          >{`${String.fromCharCode(65 + index)} ${op.label}`}</button>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const rounds = await getRounds(query.id ?? 0);

  return { props: { rounds } };
}

export default RoundsPage;
