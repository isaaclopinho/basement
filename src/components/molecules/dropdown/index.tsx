import React, { memo } from 'react';

import Label from 'components/atoms/label';
import Select, { Item } from 'components/atoms/select';
import styles from './index.module.scss';

export interface DropdownProps {
  id: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
  items: Item[];
  className?: string;
  disabled?: boolean;
}

function Dropdown({
  id,
  title,
  items,
  onChange,
  value,
  className,
  disabled,
}: DropdownProps) {
  return (
    <div className={`${styles['form-group']} ${className}`}>
      <Label htmlFor={id}>{title}</Label>
      <Select
        id={id}
        onChange={onChange}
        value={value}
        items={items}
        disabled={disabled}
      />
    </div>
  );
}

Dropdown.defaultProps = {
  className: null,
  disabled: false,
};

const propsAreEqual = (prev: DropdownProps, next: DropdownProps) => {
  const propsToCompare: (keyof DropdownProps)[] = [
    'id',
    'items',
    'onChange',
    'title',
    'value',
  ];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(Dropdown, propsAreEqual);
