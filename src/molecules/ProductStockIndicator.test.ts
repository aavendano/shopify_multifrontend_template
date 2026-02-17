import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import ProductStockIndicator from './ProductStockIndicator.astro';

describe('ProductStockIndicator', () => {
  it('renders in stock', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductStockIndicator, {
      props: { quantity: 50 }
    });
    expect(result).toContain('In Stock');
    expect(result).toContain('is-success');
  });

  it('renders low stock', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductStockIndicator, {
      props: { quantity: 5, lowStockThreshold: 10 }
    });
    expect(result).toContain('Only 5 left!');
    expect(result).toContain('is-warning');
  });
});
