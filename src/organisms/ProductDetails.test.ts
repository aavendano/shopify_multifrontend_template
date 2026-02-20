import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import ProductDetails from './ProductDetails.astro';

describe('ProductDetails', () => {
  it('renders product info', async () => {
    const container = await experimental_AstroContainer.create();
    const product = {
        id: '1',
        title: 'Product Title',
        description: 'Desc',
        price: 100,
        currency: 'USD',
        variants: [{ id: 'v1', title: 'Default', price: 100, stock: 10 }]
    };

    const result = await container.renderToString(ProductDetails, {
      props: {
          product,
          currentPrice: 100,
          currentStock: 10,
          variantOptions: [{ label: 'Default', value: 'v1' }],
          selectedVariant: product.variants[0]
      }
    });
    expect(result).toContain('Product Title');
    expect(result).toContain('$100.00');
    expect(result).toContain('Desc');
    expect(result).toContain('Add to Cart');
  });

  it('renders out of stock', async () => {
    const container = await experimental_AstroContainer.create();
    const product = {
        id: '1',
        title: 'Product Title',
        description: 'Desc',
        price: 100,
        variants: [{ id: 'v1', title: 'Default', price: 100, stock: 0 }]
    };

    const result = await container.renderToString(ProductDetails, {
      props: {
          product,
          currentPrice: 100,
          currentStock: 0,
          variantOptions: [{ label: 'Default', value: 'v1' }],
          selectedVariant: product.variants[0]
      }
    });
    expect(result).toContain('Out of Stock');
    expect(result).toContain('disabled');
  });
});
