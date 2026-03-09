import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Spacer from './Spacer.astro';

describe('Spacer', () => {
  it('renders with default props (size=3, axis=y)', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Spacer);

    expect(result).toContain('<div');
    expect(result).toContain('class="my-3"');
  });

  it('renders with axis x', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Spacer, {
      props: { axis: 'x' }
    });

    expect(result).toContain('class="mx-3"');
  });

  it('renders with axis both', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Spacer, {
      props: { axis: 'both' }
    });

    expect(result).toContain('class="m-3"');
  });

  it('applies different sizes', async () => {
    const container = await experimental_AstroContainer.create();
    const sizes = ['1', '2', '3', '4', '5', '6'] as const;

    for (const size of sizes) {
      const result = await container.renderToString(Spacer, {
        props: { size }
      });
      expect(result).toContain(`class="my-${size}"`);
    }
  });

  it('merges custom classes and omits undefined', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Spacer, {
      props: { class: 'custom-spacer-class' }
    });

    expect(result).toContain('class="my-3 custom-spacer-class"');
    expect(result).not.toContain('undefined');
  });

  it('combines custom axis, size, and class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Spacer, {
      props: { axis: 'both', size: '5', class: 'custom-spacer-class' }
    });

    expect(result).toContain('class="m-5 custom-spacer-class"');
  });
});
