import React from 'react';
import { render } from '@testing-library/react';
import Select from 'components/atoms/select';

describe('It renders properly', () => {
  it('renders the items in select correctly', async () => {
    const { getAllByText } = render(
      <Select
        onChange={(e) => e}
        items={[
          { id: 0, name: 'item-1' },
          { id: 1, name: 'item-2' },
        ]}
        value={0}
      />
    );

    const options = await getAllByText('item-1');
    const options2 = await getAllByText('item-2');

    expect(options.length).toBe(1);
    expect(options2.length).toBe(1);
  });

  it('we can override the className label', async () => {
    const { getByTestId } = render(
      <Select
        onChange={(e) => e}
        items={[
          { id: 0, name: 'item-1' },
          { id: 1, name: 'item-2' },
        ]}
        value={0}
        className="override"
      />
    );

    const select = await getByTestId('select');

    expect(select).toHaveClass('override');
  });
});
