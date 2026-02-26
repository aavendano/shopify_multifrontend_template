import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import ProductGrid from './ProductGrid.astro';

describe('ProductGrid', () => {
  it('renders with default props (4 columns)', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid);

    expect(result).toContain('is-one-quarter-desktop');
    expect(result).not.toContain('is-fluid');
  });

  it('renders with 2 columns', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid, {
      props: { columns: 2 }
    });

    expect(result).toContain('is-half-desktop');
  });

  it('renders with 3 columns', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid, {
      props: { columns: 3 }
    });

    expect(result).toContain('is-one-third-desktop');
  });

  it('renders with 6 columns', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid, {
      props: { columns: 6 }
    });

    expect(result).toContain('is-2-desktop');
  });

  it('renders as fluid container when fluid prop is true', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid, {
      props: { fluid: true }
    });

    expect(result).toContain('is-fluid');
  });

  it('renders slot content correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ProductGrid, {
      slots: { default: '<div class="test-content">Product Content</div>' }
    });

    expect(result).toContain('test-content');
    expect(result).toContain('Product Content');
  });
});
