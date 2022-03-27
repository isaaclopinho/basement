import React from 'react';
import { render } from '@testing-library/react';
import Input from 'components/atoms/input';

describe('It renders properly', () => {
  it('renders a input id, placeholder and values correctly', async () => {
    const { getByTestId } = render(
      <Input
        id="id"
        placeholder="Placeholder"
        value="Value"
        onChange={(e) => e}
      />
    );

    const component = await getByTestId('input');

    expect(component).toHaveAttribute('placeholder', 'Placeholder');
    expect(component).toHaveAttribute('value', 'Value');
    expect(component).toHaveAttribute('id', 'id');
  });

  it('we can override the className input', async () => {
    const { getByTestId } = render(<Input className="override" />);

    const button = await getByTestId('input');

    expect(button).toHaveClass('override');
  });
});
