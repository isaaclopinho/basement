import React from 'react';
import { render } from '@testing-library/react';
import Label from 'components/atoms/label';

describe('It renders properly', () => {
  it('renders a text in a label correctly', async () => {
    const { getAllByText } = render(<Label>label!</Label>);

    const labels = await getAllByText('label!');

    expect(labels.length).toBe(1);
  });

  it('we can override the className label', async () => {
    const { getByText } = render(<Label className="override">label!</Label>);

    const label = await getByText('label!');

    expect(label).toHaveClass('override');
  });
});
