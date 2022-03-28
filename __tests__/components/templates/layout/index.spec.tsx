import React from 'react';
import { render } from '@testing-library/react';
import Layout from 'components/templates/layout';

describe('It renders properly', () => {
  it('layout must have a child', async () => {
    const { getByText } = render(
      <Layout>
        <div>ABC</div>
      </Layout>
    );

    const div = await getByText('ABC');

    expect(div).not.toBeNull();
  });
});
