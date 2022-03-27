import React from 'react';
import { render } from '@testing-library/react';
import Button from 'components/atoms/button';

describe('It renders properly', () => {
  it('renders a text in a button correctly', async () => {
    const { getAllByText } = render(
      <Button id="button-id" onClick={(e) => e}>
        Aperte me!
      </Button>
    );

    const texts = await getAllByText('Aperte me!');

    expect(texts.length).toBe(1);
  });

  it('renders a submit button correctly', async () => {
    const { getByText } = render(<Button type="submit">Aperte me!</Button>);

    const button = await getByText('Aperte me!');

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders a button with optional className correctly', async () => {
    const { getByText } = render(
      <Button type="submit" className="test">
        Aperte me!
      </Button>
    );

    const button = await getByText('Aperte me!');

    expect(button).toHaveClass('test');
  });
});
