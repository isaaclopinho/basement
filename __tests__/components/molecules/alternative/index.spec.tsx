import React from 'react';
import { render } from '@testing-library/react';
import Alternative from 'components/molecules/alternative';

describe('It renders properly', () => {
  it('renders an alternative option correctly', async () => {
    const { getAllByText, getByText } = render(
      <Alternative
        index={0}
        description="Alternativa 1"
        onClick={jest.fn()}
        disabled={false}
      />
    );

    const description = await getAllByText('Alternativa 1');
    const letter = await getByText('A');

    expect(description.length).toBe(1);
    expect(letter).not.toBeNull();
  });

  it('renders a letter B => index = 1', async () => {
    const { getByText } = render(
      <Alternative
        index={1}
        description="Alternativa 1"
        onClick={jest.fn()}
        disabled={false}
      />
    );

    const letter = await getByText('B');

    expect(letter).not.toBeNull();
  });
});
