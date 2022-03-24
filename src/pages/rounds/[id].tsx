import { getCategories } from '../../services/categories';

function Rounds({ test }) {
  return <h1>{`Round ${JSON.stringify(test)}`}</h1>;
}

export async function getServerSideProps(context) {
  const categories = await getCategories();

  return { props: { test: categories } };
}

export default Rounds;
