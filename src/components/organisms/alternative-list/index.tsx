import Alternative from 'components/molecules/alternative';
import React, { memo } from 'react';
import { Option } from 'services/types';
import styles from './index.module.scss';

export interface AlternativeListProps {
  alternatives: Option[];
  onClick: (id: number) => void;
  disabled?: boolean;
}

function AlternativeList({
  alternatives,
  onClick,
  disabled,
}: AlternativeListProps): JSX.Element {
  return (
    <div className={styles.main}>
      {alternatives.map((option, index) => (
        <Alternative
          key={option.id}
          description={option.label}
          index={index}
          onClick={() => onClick(option.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

AlternativeList.defaultProps = {
  disabled: false,
};

const propsAreEqual = (
  prev: AlternativeListProps,
  next: AlternativeListProps
) => {
  const propsToCompare: (keyof AlternativeListProps)[] = [
    'alternatives',
    'disabled',
    'onClick',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(AlternativeList, propsAreEqual);
