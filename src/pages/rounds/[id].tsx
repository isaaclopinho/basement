import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getRounds, postAnswerRounds } from 'services/rounds';
import { Rounds } from 'services/types';
import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import { getQuestionsNotAnswered, getQuestionsStatus } from 'utils/questions';
import redirects from 'utils/route';
import { notifyError } from 'utils/toasts';
import styles from 'styles/Rounds.module.scss';
import Spinner from 'components/atoms/spinner';
import AlternativeList from 'components/organisms/alternative-list';
import Stepper from 'components/molecules/stepper';

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

  const answeredAll = useMemo(
    () => currentQuestions.length === 0,
    [currentQuestions]
  );

  const answerQuestion = useCallback(async () => {
    const response = await postAnswerRounds(rounds.round.id, {
      answer: {
        option_id: alternativeSelected,
        question_id: currentQuestions[0].id,
      },
    });

    if (response._hasError) {
      notifyError('Algo deu errado! Tente novamente mais tarde...');
      setLoading(false);
      return;
    }

    const dataTmp = { ...data };
    dataTmp.round.answers.push(response.answer);

    setData(dataTmp);
    setLoading(false);
  }, [alternativeSelected, currentQuestions, data, rounds]);

  const selectQuestion = useCallback(
    (id: number) => {
      if (loading) {
        return;
      }

      setAlternativeSelected(id);
      setLoading(true);
    },
    [loading]
  );

  useEffect(() => {
    if (!loading) {
      return;
    }

    answerQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (answeredAll) {
      router.push(`/rounds/${rounds.round?.id}/results`);
    }
  }, [answeredAll, router, rounds]);

  return (
    <Layout>
      {answeredAll ? (
        <div className={styles['spinner-container']}>
          <Spinner />
        </div>
      ) : (
        <div>
          <Stepper
            actives={status.current}
            total={status.total}
            colorActive={styles['color-active']}
            colorInactive={styles['color-inactive']}
          />
          <div className={styles['points-container']}>
            <p>
              Pontuação:
              <b>{` ${status.corrects}/${status.total}`}</b>
            </p>
          </div>

          <div className={styles['question-container']}>
            <h1>{currentQuestions[0].description}</h1>
          </div>

          <AlternativeList
            alternatives={currentQuestions[0].options}
            disabled={loading}
            onClick={selectQuestion}
          />
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query, res } = context;
  const rounds = await getRounds(query.id ?? 0);

  if (rounds._hasError) {
    redirects(res, '/');
  }

  return { props: { rounds } };
}

export default RoundsPage;
