import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard.astro';

describe('ProductCard', () => {
  it('renders correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductCard, {
      props: {
        productId: '1',
        title: 'Test Product',
        image: 'img.jpg',
        price: 100,
        href: '/p/1'
      }
    });
    expect(result).toContain('Test Product');
    expect(result).toContain('$100.00');
    expect(result).toContain('src="img.jpg"');
    expect(result).toContain('href="/p/1"');
  });

  it('renders quick add button when enabled', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductCard, {
      props: {
        productId: '1',
        title: 'Test',
        image: 'img.jpg',
        price: 100,
        href: '/p/1',
        showQuickAdd: true
      }
    });
    expect(result).toContain('Add to Cart');
    expect(result).toContain('quick-add-btn');
  });
});
