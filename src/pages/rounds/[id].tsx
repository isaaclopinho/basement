import React from 'react';
import { getRounds } from 'services/rounds';

function Rounds({ rounds }) {
  return <h1>{`Round ${JSON.stringify(rounds)}`}</h1>;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const rounds = await getRounds(query.id ?? 0);

  return { props: { rounds } };
}

export default Rounds;
