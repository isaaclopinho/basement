import React, { memo, useMemo } from 'react';
import styles from './index.module.scss';

export type AlternativeType = 'default' | 'correct' | 'wrong';

export interface AlternativeProps {
  index?: number;
  description: string;
  onClick: (e) => void;
  disabled?: boolean;
  type?: AlternativeType;
}

const getClassNameByType = (type: AlternativeType): string => {
  switch (type) {
    case 'correct':
      return 'correct';
    case 'wrong':
      return 'wrong';
    default:
      return 'default';
  }
};

function Alternative({
  index,
  description,
  onClick,
  disabled,
  type,
}: AlternativeProps) {
  const classType = useMemo(() => getClassNameByType(type), [type]);

  return (
    <button
      type="button"
      className={`${styles['alternative-container']} ${styles[classType]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.letter}>
        <h2>{String.fromCharCode(65 + index)}</h2>
      </div>
      <div className={styles.description}>
        <p>{`${description}`}</p>
      </div>
    </button>
  );
}

Alternative.defaultProps = {
  index: 0,
  disabled: false,
  type: 'default',
};

const propsAreEqual = (prev: AlternativeProps, next: AlternativeProps) => {
  const propsToCompare: (keyof AlternativeProps)[] = [
    'description',
    'disabled',
    'index',
    'onClick',
    'type',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(Alternative, propsAreEqual);
