import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { getRoundsResults } from 'services/rounds';
import { Results as ResultsType } from 'services/types';
import { getResultsPoints } from 'utils/questions';
import redirects from 'utils/route';

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
    <Layout title="Quiz App - Results">
      <>
        <div>{`percentage ${stats.percentage}`}</div>
        <div>{`stars ${stats.stars}`}</div>
        <button type="button" onClick={goToHome}>
          Ir para pagina inicial
        </button>
      </>
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
