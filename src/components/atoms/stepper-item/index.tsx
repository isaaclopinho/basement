import React, { memo } from 'react';
import styles from './index.module.scss';

export interface StepProps {
  colorClassName: string;
  isLast?: boolean;
}

function StepperItem({ colorClassName, isLast }: StepProps) {
  return (
    <div
      data-testid="stepper-item"
      className={`${styles.step} ${colorClassName} ${
        isLast ? '' : styles.margin
      }`}
    />
  );
}

StepperItem.defaultProps = {
  isLast: false,
};

export default memo(StepperItem);
