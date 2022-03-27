import React, { memo } from 'react';
import styles from './index.module.scss';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({ ...props }: ButtonProps) {
  return <button type="button" className={styles.button} {...props} />;
}

export default memo(Button);
