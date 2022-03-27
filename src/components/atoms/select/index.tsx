import React, { memo } from 'react';
import styles from './index.module.scss';

export type Item = {
  id: number;
  name: string;
};

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  items: Item[];
}

function Select({ items, ...props }: SelectProps) {
  return (
    <select data-testid="select" className={styles.select} {...props}>
      {items.map((item) => (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default memo(Select);
