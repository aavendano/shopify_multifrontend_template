import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Input from './Input.astro';

describe('Input', () => {
  it('renders an input element with default classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input);

    expect(result).toContain('<input');
    expect(result).toContain('class="input"');
    expect(result).not.toContain('is-');
  });

  it('applies variant classes correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const variants = ['primary', 'info', 'success', 'warning', 'danger'] as const;

    for (const variant of variants) {
      const result = await container.renderToString(Input, {
        props: { variant }
      });
      expect(result).toContain(`is-${variant}`);
    }
  });

  it('applies size classes correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const sizes = ['small', 'medium', 'large'] as const;

    for (const size of sizes) {
      const result = await container.renderToString(Input, {
        props: { size }
      });
      expect(result).toContain(`is-${size}`);
    }
  });

  it('does not apply normal size class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input, {
      props: { size: 'normal' }
    });

    expect(result).not.toContain('is-normal');
  });

  it('applies rounded class correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input, {
      props: { rounded: true }
    });

    expect(result).toContain('is-rounded');
  });

  it('applies error class and aria-invalid attribute correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input, {
      props: { error: true }
    });

    expect(result).toContain('is-danger');
    expect(result).toContain('aria-invalid="true"');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input, {
      props: { class: 'custom-class' }
    });

    expect(result).toContain('class="input custom-class"');
  });

  it('spreads additional attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Input, {
      props: {
        'aria-label': 'My Input',
        id: 'input-1',
        type: 'email',
        placeholder: 'Enter email'
      }
    });

    expect(result).toContain('aria-label="My Input"');
    expect(result).toContain('id="input-1"');
    expect(result).toContain('type="email"');
    expect(result).toContain('placeholder="Enter email"');
  });
});
