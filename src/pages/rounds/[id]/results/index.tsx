import Stars from 'components/molecules/stars';
import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { getRoundsResults } from 'services/rounds';
import { Results as ResultsType } from 'services/types';
import { redirects } from 'utils/misc';
import { getResultsPoints } from 'utils/questions';
import styles from 'styles/Results.module.scss';
import Button from 'components/atoms/button';

export interface ResultsProps {
  results: ResultsType;
}

function Results({ results }: ResultsProps) {
  const router = useRouter();
  const stats = useMemo(() => getResultsPoints(results), [results]);

  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Layout>
      <div className={styles.container}>
        <Stars actives={stats.stars} />

        <div>
          <h3>{`Acertos: ${results.round.total_correct_answers}`}</h3>
          <h3>{`Número de Questões: ${results.round.total_questions}`}</h3>
        </div>
        <Button type="button" onClick={goToHome} className={styles.button}>
          Ir para pagina inicial
        </Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query, res } = context;
  const results = await getRoundsResults(query.id ?? 0);

  if (results._hasError) {
    redirects(res, '/');
  }

  return { props: { results } };
}

export default Results;
