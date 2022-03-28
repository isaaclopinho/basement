import React from 'react';
import { render } from '@testing-library/react';
import Stepper from 'components/molecules/stepper';

describe('It renders properly', () => {
  it('renders a stepper with 5 stepper-items (3 active/2 inactive)', async () => {
    const { getByTestId } = render(
      <Stepper
        actives={3}
        total={5}
        colorActive="blue"
        colorInactive="yellow"
      />
    );

    const stepper = await getByTestId('stepper');

    expect(stepper.children.length).toBe(5);

    expect(stepper.children[0]).toHaveClass('blue');
    expect(stepper.children[1]).toHaveClass('blue');
    expect(stepper.children[2]).toHaveClass('blue');
    expect(stepper.children[3]).toHaveClass('yellow');
    expect(stepper.children[4]).toHaveClass('yellow');
  });
});
