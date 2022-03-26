import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postRounds } from 'services/rounds';
import Layout from 'components/templates/layout';
import { Category } from 'services/types';
import getCategories from 'services/categories';
import { notifyError } from 'utils/toasts';

export interface StartGameProps {
  categories: Category[];
  name: string;
}

function StartGame({ categories, name }: StartGameProps) {
  const router = useRouter();
  const [playerName, setPlayerName] = useState<string>(name);
  const [categoryId, setCategoryId] = useState<number>(categories[0].id);
  const [loading, setLoading] = useState(false);

  const createRound = useCallback(async () => {
    const data = await postRounds({
      round: {
        category_id: categoryId,
        player_name: playerName,
      },
    });

    if (data._hasError) {
      notifyError('Algo deu errado! Tente novamente mais tarde...');
      setLoading(false);
      return;
    }

    router.push(`/rounds/${data.round.id}`);
    setLoading(false);
  }, [categoryId, playerName, router]);

  const onSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) {
        return;
      }

      if (categoryId == null || !playerName) {
        notifyError('Por favor, preencha os campos!');
        return;
      }

      setLoading(true);
    },
    [categoryId, loading, playerName]
  );

  const onChangePlayerName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push({
        query: { name: e.target.value },
      });
      setPlayerName(e.target.value);
    },
    [router]
  );

  const onChangeCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10);
      setCategoryId(value);
    },
    []
  );

  useEffect(() => {
    if (!loading) {
      return;
    }

    createRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Layout title="Quiz App">
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="player-name">
            Jogador
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={onChangePlayerName}
            />
          </label>
          <label htmlFor="categories-select">
            Categorias
            <select
              id="categories-select"
              value={categoryId}
              onChange={onChangeCategory}
            >
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'LOADING' : 'CLIQUE ME'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const data = await getCategories();

  return { props: { categories: data.categories, name: query.name ?? '' } };
}

export default StartGame;
