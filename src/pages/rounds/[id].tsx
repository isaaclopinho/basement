import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getRounds, postAnswerRounds } from 'services/rounds';
import { Rounds } from 'services/types';
import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import { getQuestionsNotAnswered, getQuestionsStatus } from 'utils/questions';

export interface RoundsProps {
  rounds: Rounds;
}

function RoundsPage({ rounds }: RoundsProps) {
  const router = useRouter();
  const [data, setData] = useState(rounds);
  const [loading, setLoading] = useState(false);
  const [alternativeSelected, setAlternativeSelected] = useState(-1);

  const currentQuestions = useMemo(() => getQuestionsNotAnswered(data), [data]);
  const status = useMemo(() => getQuestionsStatus(data), [data]);

  const answeredAll = currentQuestions.length === 0;

  const answerQuestion = useCallback(async () => {
    const response = await postAnswerRounds(rounds.round.id, {
      answer: {
        option_id: alternativeSelected,
        question_id: currentQuestions[0].id,
      },
    });

    if (response._hasError) {
      setLoading(false);
      return;
    }

    const dataTmp = { ...data };
    dataTmp.round.answers.push(response.answer);

    setData(dataTmp);
    setLoading(false);
  }, [alternativeSelected, currentQuestions, data, rounds.round.id]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    answerQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (answeredAll) {
      router.push(`/rounds/${rounds.round.id}/results`);
    }
  }, [answeredAll, router, rounds.round.id]);

  if (answeredAll) {
    return <div />;
  }

  return (
    <Layout title="Quiz App">
      <div>
        <h1>{`Round id: ${rounds.round.id}`}</h1>
        <h1>{`corrects: ${status.corrects} / ${status.total}`}</h1>
        <h1>{`Round player_id: ${rounds.round.player_id}`}</h1>
        <p>{`Question description: ${currentQuestions[0].description}`}</p>
        <p>{`Question id: ${currentQuestions[0].id}`}</p>
        {currentQuestions[0].options.map((op, index) => {
          const selectQuestion = () => {
            if (loading) {
              return;
            }

            setAlternativeSelected(op.id);
            setLoading(true);
          };

          return (
            <button
              type="button"
              key={op.id}
              disabled={loading}
              onClick={selectQuestion}
            >{`${String.fromCharCode(65 + index)} ${op.label}`}</button>
          );
        })}
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
