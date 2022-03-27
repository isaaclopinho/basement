import React, { memo } from 'react';
import styles from './index.module.scss';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function Input({ ...props }: InputProps) {
  return (
    <input
      data-testid="input"
      className={styles.input}
      {...props}
      type="text"
    />
  );
}

export default memo(Input);
