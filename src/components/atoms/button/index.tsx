import React, { memo } from 'react';
import styles from './index.module.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`${styles.button} ${className}`}
    />
  );
}

Button.defaultProps = {
  className: '',
};

export default memo(Button);
