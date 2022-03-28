import React from 'react';
import { render } from '@testing-library/react';
import Dropdown from 'components/molecules/dropdown';

describe('It renders properly', () => {
  it('renders a dropdown correctly', async () => {
    const { getAllByText } = render(
      <Dropdown
        id="id"
        onChange={jest.fn()}
        title="Title"
        items={[
          { id: 0, name: 'item-1' },
          { id: 1, name: 'item-2' },
        ]}
        value={0}
      />
    );

    const items = await getAllByText('item-1');
    const items2 = await getAllByText('item-2');
    const titles = await getAllByText('Title');

    expect(items.length + items2.length).toBe(2);
    expect(titles.length).toBe(1);
  });

  it('we can customize the dropdown container using the className prop', async () => {
    const { getByTestId } = render(
      <Dropdown
        id="id"
        onChange={jest.fn()}
        title="Title"
        items={[
          { id: 0, name: 'item-1' },
          { id: 1, name: 'item-2' },
        ]}
        value={0}
        className="optional"
      />
    );

    const dropdown = await getByTestId('dropdown-container');

    expect(dropdown).toHaveClass('optional');
  });
});
