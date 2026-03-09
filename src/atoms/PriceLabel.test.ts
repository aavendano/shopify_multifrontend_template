import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import PriceLabel from './PriceLabel.astro';

describe('PriceLabel', () => {
  it('renders formatted price in USD by default', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(PriceLabel, {
      props: { price: 1000 }
    });

    expect(result).toContain('$1,000.00');
    expect(result).toContain('is-size-5'); // default medium size
  });

  it('renders formatted price in a different currency', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(PriceLabel, {
      props: { price: 1500.5, currency: 'CAD' }
    });

    expect(result).toContain('CA$1,500.50');
  });

  it('renders compare-at price with line-through style', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(PriceLabel, {
      props: { price: 800, compareAtPrice: 1000 }
    });

    expect(result).toContain('$800.00');
    expect(result).toContain('$1,000.00');
    expect(result).toContain('text-decoration: line-through;');
    expect(result).toContain('has-text-grey-light');
  });

  it('applies different sizes correctly', async () => {
    const container = await experimental_AstroContainer.create();

    // Small
    let result = await container.renderToString(PriceLabel, {
      props: { price: 10, size: 'small' }
    });
    expect(result).toContain('is-size-6');

    // Medium
    result = await container.renderToString(PriceLabel, {
      props: { price: 10, size: 'medium' }
    });
    expect(result).toContain('is-size-5');

    // Large
    result = await container.renderToString(PriceLabel, {
      props: { price: 10, size: 'large' }
    });
    expect(result).toContain('is-size-4');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(PriceLabel, {
      props: { price: 100, class: 'my-custom-price-class' }
    });

    expect(result).toContain('price-label');
    expect(result).toContain('my-custom-price-class');
  });

  it('formats string prices correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(PriceLabel, {
      props: { price: '2500.99', compareAtPrice: '3000' }
    });

    expect(result).toContain('$2,500.99');
    expect(result).toContain('$3,000.00');
  });
});
