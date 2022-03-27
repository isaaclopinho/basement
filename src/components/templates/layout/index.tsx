import React, { ReactElement } from 'react';
import styles from './index.module.scss';

export interface PageTemplateProps {
  children: ReactElement;
}

function Layout({ children }: PageTemplateProps) {
  return (
    <div className={styles['main-container']}>
      <main>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}

export default Layout;
