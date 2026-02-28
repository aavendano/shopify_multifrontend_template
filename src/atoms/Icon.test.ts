import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.astro';

describe('Icon', () => {
  it('renders base icon class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' }
    });
    expect(result).toContain('class="icon');
  });

  it('renders correct SVG content for cart icon', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' }
    });
    // Checking for part of the cart SVG path
    expect(result).toContain('cx="9" cy="21" r="1"');
    expect(result).toContain('path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"');
  });

  it('renders correct SVG content for search icon', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'search' }
    });
    expect(result).toContain('cx="11" cy="11" r="8"');
    expect(result).toContain('line x1="21" y1="21" x2="16.65" y2="16.65"');
  });

  it('applies size class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart', size: 'small' }
    });
    expect(result).toContain('is-small');
  });

  it('applies color class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart', color: 'primary' }
    });
    expect(result).toContain('has-text-primary');
  });

  it('applies custom class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart', class: 'custom-class' }
    });
    expect(result).toContain('custom-class');
  });

  it('applies fa-spin class for loader icon', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'loader' }
    });
    expect(result).toContain('fa-spin');
  });

  it('does not apply fa-spin class for other icons', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' }
    });
    expect(result).not.toContain('fa-spin');
  });
});
