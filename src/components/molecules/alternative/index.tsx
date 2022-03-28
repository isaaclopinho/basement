import Button from 'components/atoms/button';
import React, { memo } from 'react';
import styles from './index.module.scss';

export interface AlternativeProps {
  index?: number;
  description: string;
  onClick: (e) => void;
  disabled?: boolean;
}

function Alternative({
  index,
  description,
  onClick,
  disabled,
}: AlternativeProps) {
  return (
    <Button
      type="button"
      className={styles['alternative-container']}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.letter}>
        <h2>{String.fromCharCode(65 + index)}</h2>
      </div>
      <div className={styles.description}>
        <p>{`${description}`}</p>
      </div>
    </Button>
  );
}

Alternative.defaultProps = {
  index: 0,
  disabled: false,
};

const propsAreEqual = (prev: AlternativeProps, next: AlternativeProps) => {
  const propsToCompare: (keyof AlternativeProps)[] = [
    'description',
    'disabled',
    'index',
    'onClick',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(Alternative, propsAreEqual);
