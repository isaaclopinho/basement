/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import styles from './index.module.scss';

export type InputProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

function Label({ ...props }: InputProps) {
  return <label className={styles.label} {...props} />;
}

export default memo(Label);
