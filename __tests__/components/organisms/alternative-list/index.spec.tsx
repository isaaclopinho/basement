import React from 'react';
import { render } from '@testing-library/react';
import AlternativeList from 'components/organisms/alternative-list';

describe('It renders properly', () => {
  it('renders the alternative list correctly', async () => {
    const { getAllByText, getByText } = render(
      <AlternativeList
        alternatives={[
          { id: 0, label: 'label' },
          { id: 1, label: 'label' },
          { id: 2, label: 'label' },
          { id: 3, label: 'label' },
        ]}
        onClick={(id) => id}
      />
    );

    const labels = await getAllByText('label');
    const A = await getByText('A');
    const B = await getByText('B');
    const C = await getByText('C');
    const D = await getByText('D');

    expect(labels.length).toBe(4);
    expect(A).not.toBeNull();
    expect(B).not.toBeNull();
    expect(C).not.toBeNull();
    expect(D).not.toBeNull();
  });
});
