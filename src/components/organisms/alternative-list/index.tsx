import Alternative from 'components/molecules/alternative';
import React, { memo } from 'react';
import { Option } from 'services/types';
import styles from './index.module.scss';

export interface AlternativeListProps {
  alternatives: Option[];
  onClick: (id: number, index: number) => void;
  disabled?: boolean;
  highlightQuestion?: { correct: boolean; index: number };
}

function AlternativeList({
  alternatives,
  onClick,
  disabled,
  highlightQuestion,
}: AlternativeListProps): JSX.Element {
  return (
    <div className={styles.main} data-testid="list">
      {alternatives.map((option, index) => {
        const shouldHighlight =
          highlightQuestion && highlightQuestion.index === index;
        const highlightType = highlightQuestion?.correct ? 'correct' : 'wrong';

        return (
          <Alternative
            key={option.id}
            description={option.label}
            index={index}
            onClick={() => onClick(option.id, index)}
            disabled={disabled}
            type={shouldHighlight ? highlightType : 'default'}
          />
        );
      })}
    </div>
  );
}

AlternativeList.defaultProps = {
  disabled: false,
  highlightQuestion: null,
};

const propsAreEqual = (
  prev: AlternativeListProps,
  next: AlternativeListProps
) => {
  const propsToCompare: (keyof AlternativeListProps)[] = [
    'alternatives',
    'disabled',
    'onClick',
    'highlightQuestion',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(AlternativeList, propsAreEqual);
