import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/templates/layout';
import { getCategories } from '../services/categories';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();

      if (data._hasError) {
        setLoading(false);
        return;
      }

      setLoading(false);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <Layout>
      <div>
        <div>Jogador</div>
        <div>Categorias</div>
        {loading ? <div>loading</div> : <div>{JSON.stringify(categories)}</div>}
      </div>
    </Layout>
  );
};

export default Home;
