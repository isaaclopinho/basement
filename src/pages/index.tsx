import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postRounds } from 'services/rounds';
import Layout from 'components/templates/layout';
import { Category } from 'services/types';
import getCategories from 'services/categories';
import { notifyError } from 'utils/toasts';
import Image from 'next/image';
import BasicInput from 'components/molecules/basic-input';
import Dropdown from 'components/molecules/dropdown';
import Button from 'components/atoms/button';
import styles from 'styles/StartGame.module.scss';

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
    <Layout>
      <div className={styles.container}>
        <div className={styles['mg-bt-lg']}>
          <Image src="/logo2.png" width={181} height={236} />
        </div>
        <form onSubmit={onSubmit} className={styles.container}>
          <BasicInput
            title="Jogador"
            id="player-name"
            placeholder="Nome do jogador"
            onChange={onChangePlayerName}
            value={playerName}
          />

          <Dropdown
            title="Categorias"
            id="categories-select"
            items={categories}
            onChange={onChangeCategory}
            value={categoryId}
            className={styles['mg-bt-lg']}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'CARREGANDO...' : 'INICIAR QUIZ'}
          </Button>
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
