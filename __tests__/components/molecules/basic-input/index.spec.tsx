import React from 'react';
import { render } from '@testing-library/react';
import BasicInput from 'components/molecules/basic-input';

describe('It renders properly', () => {
  it('renders a basic input correctly', async () => {
    const { getAllByText } = render(
      <BasicInput id="id" onChange={jest.fn()} title="Title" value="value" />
    );

    const label = await getAllByText('Title');

    expect(label.length).toBe(1);
  });

  it('we can customize the input container using the className prop', async () => {
    const { getByTestId } = render(
      <BasicInput
        id="id"
        onChange={jest.fn()}
        title="Title"
        value="value"
        className="optional"
      />
    );

    const input = await getByTestId('input-container');

    expect(input).toHaveClass('optional');
  });
});
