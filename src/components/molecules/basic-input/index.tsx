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
}

function BasicInput({
  id,
  title,
  placeholder,
  onChange,
  value,
  className,
}: BasicInputProps) {
  return (
    <div className={`${styles['form-group']} ${className}`}>
      <Label htmlFor={id}>{title}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

BasicInput.defaultProps = {
  className: null,
};

BasicInput.defaultProps = {
  placeholder: null,
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
