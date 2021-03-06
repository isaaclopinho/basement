import React, { memo } from 'react';
import styles from './index.module.scss';

function Spinner() {
  return (
    <div data-testid="spinner" className={styles['lds-ring']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default memo(Spinner);
