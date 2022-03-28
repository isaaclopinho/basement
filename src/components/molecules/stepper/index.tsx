import React, { memo } from 'react';
import StepperItem from 'components/atoms/stepper-item';
import styles from './index.module.scss';

export interface StepperProps {
  colorActive: string;
  colorInactive: string;
  actives: number;
  total: number;
}

function Stepper({ colorActive, colorInactive, total, actives }: StepperProps) {
  return (
    <div data-testid="stepper" className={styles.stepper}>
      {[...new Array(total)].map((_, index) => (
        <StepperItem
          key={index}
          colorClassName={index < actives ? colorActive : colorInactive}
          isLast={index >= total - 1}
        />
      ))}
    </div>
  );
}

const propsAreEqual = (prev: StepperProps, next: StepperProps) => {
  const propsToCompare: (keyof StepperProps)[] = [
    'colorActive',
    'colorInactive',
    'actives',
    'total',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(Stepper, propsAreEqual);
