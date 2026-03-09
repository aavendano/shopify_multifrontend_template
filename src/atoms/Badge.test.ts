import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Badge from './Badge.astro';

describe('Badge', () => {
  it('renders a span by default with correct default classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Badge);

    expect(result).toContain('<span');
    expect(result).toContain('class="tag is-primary"');
  });

  it('applies different variants', async () => {
    const container = await experimental_AstroContainer.create();
    const variants = [
      'primary', 'secondary', 'success', 'warning', 'danger',
      'info', 'light', 'dark', 'link', 'white', 'black', 'text', 'ghost'
    ] as const;

    for (const variant of variants) {
      const result = await container.renderToString(Badge, {
        props: { variant }
      });
      expect(result).toContain(`is-${variant}`);
    }
  });

  it('applies different sizes', async () => {
    const container = await experimental_AstroContainer.create();
    const sizes = ['normal', 'medium', 'large'] as const;

    for (const size of sizes) {
      const result = await container.renderToString(Badge, {
        props: { size }
      });
      if (size !== 'normal') {
        expect(result).toContain(`is-${size}`);
      } else {
        expect(result).not.toContain('is-normal');
      }
    }
  });

  it('applies rounded class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: { rounded: true }
    });

    expect(result).toContain('is-rounded');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: { class: 'custom-class' }
    });

    expect(result).toContain('tag');
    expect(result).toContain('is-primary');
    expect(result).toContain('custom-class');
  });

  it('renders slot content', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Badge, {
      slots: { default: 'Badge Content' }
    });

    expect(result).toContain('Badge Content');
  });

  it('spreads additional attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        'aria-label': 'My Badge',
        id: 'badge-1',
        'data-testid': 'custom-badge'
      }
    });

    expect(result).toContain('aria-label="My Badge"');
    expect(result).toContain('id="badge-1"');
    expect(result).toContain('data-testid="custom-badge"');
  });
});
