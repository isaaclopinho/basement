import React from 'react';
import { render } from '@testing-library/react';
import StepperItem from 'components/atoms/stepper-item';

describe('It renders properly', () => {
  it('renders stepperItem correctly', async () => {
    const { getByTestId } = render(
      <StepperItem colorClassName="class" isLast />
    );

    const stepperItem = await getByTestId('stepper-item');
    expect(stepperItem).toHaveClass('class');
  });
});
