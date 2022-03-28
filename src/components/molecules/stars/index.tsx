import React, { memo } from 'react';

import Image from 'next/image';
import styles from './index.module.scss';

export interface StarsProps {
  actives: number;
}

function Stars({ actives }: StarsProps) {
  return (
    <div className={styles.margin}>
      <div data-testid="stars-container" className={styles.stars}>
        {[...new Array(3)].map((_, index) => {
          const size = index === 1 ? 150 : 100;
          return (
            <Image
              key={index}
              src={`/star_${index < actives ? '' : 'in'}active.png`}
              width={size}
              height={size}
            />
          );
        })}
      </div>
      <div className={styles['stars-mobile']}>
        {[...new Array(3)].map((_, index) => {
          const size = index === 1 ? 60 : 40;
          return (
            <Image
              key={index}
              src={`/star_${index < actives ? '' : 'in'}active.png`}
              width={size}
              height={size}
            />
          );
        })}
      </div>
    </div>
  );
}

const propsAreEqual = (prev: StarsProps, next: StarsProps) => {
  const propsToCompare: (keyof StarsProps)[] = ['actives'];
  return propsToCompare.every((prop) => prev[prop] === next[prop]);
};

export default memo(Stars, propsAreEqual);
