import React, { ReactElement } from 'react';
import styles from './layout.module.scss';

export interface PageTemplateProps {
  children: ReactElement;
  title?: string;
}

const Layout = ({ children, title = 'Quiz App' }: PageTemplateProps) => {
  return (
    <div className={styles['main-container']}>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <div className={styles['test']}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
