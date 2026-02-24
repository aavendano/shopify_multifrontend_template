import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import StockLabel from './StockLabel.astro';

describe('StockLabel', () => {
  it('renders "In Stock" when quantity is above threshold', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 20 }
    });

    expect(result).toContain('In Stock');
    expect(result).toContain('is-success');
    expect(result).toContain('tag');
    expect(result).toContain('is-light');
  });

  it('renders low stock message when quantity is below default threshold (10)', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 5 }
    });

    expect(result).toContain('Only 5 left!');
    expect(result).toContain('is-warning');
  });

  it('renders "Out of Stock" when quantity is 0', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 0 }
    });

    expect(result).toContain('Out of Stock');
    expect(result).toContain('is-danger');
  });

  it('respects custom threshold prop', async () => {
    const container = await experimental_AstroContainer.create();
    // Default threshold is 10, so 5 is low stock.
    // If we set threshold to 3, then 5 should be "In Stock".
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 5, threshold: 3 }
    });

    expect(result).toContain('In Stock');
    expect(result).toContain('is-success');
  });

  it('respects custom threshold prop for low stock', async () => {
    const container = await experimental_AstroContainer.create();
    // Default threshold is 10. If we set threshold to 20, then 15 should be "low stock".
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 15, threshold: 20 }
    });

    expect(result).toContain('Only 15 left!');
    expect(result).toContain('is-warning');
  });

  it('applies custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(StockLabel, {
      props: { quantity: 10, class: 'custom-class' }
    });

    expect(result).toContain('custom-class');
  });
});
