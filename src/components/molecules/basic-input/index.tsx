import React, { memo } from 'react';

import Input from 'components/atoms/input';
import Label from 'components/atoms/label';
import styles from './index.module.scss';

export interface BasicInputProps {
  id: string;
  title: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  disabled?: boolean;
}

function BasicInput({
  id,
  title,
  placeholder,
  onChange,
  value,
  className,
  disabled,
}: BasicInputProps) {
  return (
    <div
      data-testid="input-container"
      className={`${styles['form-group']} ${className}`}
    >
      <Label htmlFor={id}>{title}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

BasicInput.defaultProps = {
  className: null,
  placeholder: null,
  disabled: false,
};

const propsAreEqual = (prev: BasicInputProps, next: BasicInputProps) => {
  const propsToCompare: (keyof BasicInputProps)[] = [
    'id',
    'onChange',
    'title',
    'value',
    'placeholder',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(BasicInput, propsAreEqual);
