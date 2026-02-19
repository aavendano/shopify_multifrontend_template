import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import QuantitySelector from './QuantitySelector.astro';

describe('QuantitySelector', () => {
  it('renders input with value', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(QuantitySelector, {
      props: { value: 5, min: 1, max: 10 }
    });
    expect(result).toContain('value="5"');
    expect(result).toContain('min="1"');
    expect(result).toContain('max="10"');
  });
});
