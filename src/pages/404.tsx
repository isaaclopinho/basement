import Layout from 'components/templates/layout';
import React from 'react';
import styles from 'styles/404.module.scss';

function Error() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.font}>404</div>
        <h1>Desculpe, esta página não existe!</h1>
      </div>
    </Layout>
  );
}

export default Error;
