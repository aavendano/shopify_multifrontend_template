import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import ProductPrice from './ProductPrice.astro';

describe('ProductPrice', () => {
  it('renders standard price', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductPrice, {
      props: { price: 100 }
    });
    expect(result).toContain('$100.00');
  });

  it('renders sale price and badge', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductPrice, {
      props: { price: 80, compareAtPrice: 100, showSavings: true }
    });
    expect(result).toContain('$80.00');
    expect(result).toContain('20% OFF');
  });
});
