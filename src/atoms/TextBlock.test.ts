import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import TextBlock from './TextBlock.astro';

describe('TextBlock', () => {
  it('renders a p tag by default', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(TextBlock);

    expect(result).toMatch(/^<p/);
    expect(result).toContain('</p>');
  });

  it('renders the specified HTML tag', async () => {
    const container = await experimental_AstroContainer.create();
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'] as const;

    for (const tag of tags) {
      const result = await container.renderToString(TextBlock, {
        props: { tag }
      });
      expect(result).toMatch(new RegExp(`^<${tag}`));
      expect(result).toContain(`</${tag}>`);
    }
  });

  it('maps size prop to is-size-* class', async () => {
    const container = await experimental_AstroContainer.create();
    const sizes = ['1', '2', '3', '4', '5', '6', '7'] as const;

    for (const size of sizes) {
      const result = await container.renderToString(TextBlock, {
        props: { size }
      });
      expect(result).toContain(`class="is-size-${size}"`);
    }
  });

  it('maps weight prop to has-text-weight-* class', async () => {
    const container = await experimental_AstroContainer.create();
    const weights = ['light', 'normal', 'medium', 'semibold', 'bold'] as const;

    for (const weight of weights) {
      const result = await container.renderToString(TextBlock, {
        props: { weight }
      });
      expect(result).toContain(`class="has-text-weight-${weight}"`);
    }
  });

  it('maps align prop to has-text-* class', async () => {
    const container = await experimental_AstroContainer.create();
    const alignments = ['left', 'centered', 'right', 'justified'] as const;

    for (const align of alignments) {
      const result = await container.renderToString(TextBlock, {
        props: { align }
      });
      expect(result).toContain(`class="has-text-${align}"`);
    }
  });

  it('maps color prop to has-text-* class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(TextBlock, {
      props: { color: 'primary' }
    });

    expect(result).toContain('class="has-text-primary"');
  });

  it('combines multiple styling props correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(TextBlock, {
      props: {
        size: '2',
        weight: 'bold',
        align: 'centered',
        color: 'info',
        class: 'custom-utility'
      }
    });

    expect(result).toContain('is-size-2');
    expect(result).toContain('has-text-weight-bold');
    expect(result).toContain('has-text-centered');
    expect(result).toContain('has-text-info');
    expect(result).toContain('custom-utility');
  });

  it('renders slotted content', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(TextBlock, {
      slots: { default: 'Hello World!' }
    });

    expect(result).toContain('Hello World!');
  });

  it('spreads additional attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(TextBlock, {
      props: {
        id: 'title-id',
        'data-testid': 'text-block-component',
        'aria-hidden': 'true'
      }
    });

    expect(result).toContain('id="title-id"');
    expect(result).toContain('data-testid="text-block-component"');
    expect(result).toContain('aria-hidden="true"');
  });
});
