import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/templates/layout';
import { Category, getCategories } from '../services/categories';
import styles from '../styles/Home.module.scss';

export interface HomeProps {
  categories: Category[];
}

const StartGame = ({ categories }: HomeProps) => {
  return (
    <Layout>
      <div>
        <form>
          <div>Jogador</div>
          <input type="text" id="fname" name="fname" />
          <div>Categorias</div>
          <select id="dropdown">
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button>CLIQUE ME</button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const data = await getCategories();

  return { props: { categories: data.categories } };
}

export default StartGame;
