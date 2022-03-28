import React from 'react';
import { render } from '@testing-library/react';
import Stars from 'components/molecules/stars';

describe('It renders properly', () => {
  it('renders 3 stars active', async () => {
    const { getByTestId, getAllByRole } = render(<Stars actives={3} />);

    const stars = await getByTestId('stars-container');
    const images = await getAllByRole('img');

    expect(stars.children.length).toBe(3);
    for (let i = 0; i < 3; i += 1) {
      expect(images[i]).toHaveAttribute(
        'src',
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      );
    }
  });
});
