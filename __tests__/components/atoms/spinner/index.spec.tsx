import React from 'react';
import { render } from '@testing-library/react';
import Spinner from 'components/atoms/spinner';

describe('It renders properly', () => {
  it('the spinner needs 4 children divs', async () => {
    const { getByTestId } = render(<Spinner />);

    const spinner = await getByTestId('spinner');
    expect(spinner.children.length).toBe(4);
  });
});
