import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Button from './Button.astro';

describe('Button', () => {
  it('renders a button by default', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button);

    expect(result).toContain('<button');
    expect(result).toContain('type="button"');
    expect(result).toContain('class="button is-primary"');
  });

  it('renders an anchor tag when href is provided', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { href: 'https://example.com' }
    });

    expect(result).toContain('<a');
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('class="button is-primary"');
  });

  it('applies different variants', async () => {
    const container = await experimental_AstroContainer.create();
    const variants = ['secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link', 'white', 'black', 'text', 'ghost'] as const;

    for (const variant of variants) {
      const result = await container.renderToString(Button, {
        props: { variant }
      });
      expect(result).toContain(`is-${variant}`);
    }
  });

  it('applies different sizes', async () => {
    const container = await experimental_AstroContainer.create();
    const sizes = ['small', 'medium', 'large'] as const;

    for (const size of sizes) {
      const result = await container.renderToString(Button, {
        props: { size }
      });
      expect(result).toContain(`is-${size}`);
    }
  });

  it('applies boolean props correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        disabled: true,
        fullWidth: true,
        loading: true,
        outlined: true,
        inverted: true,
        rounded: true
      }
    });

    expect(result).toContain('disabled');
    expect(result).toContain('is-fullwidth');
    expect(result).toContain('is-loading');
    expect(result).toContain('is-outlined');
    expect(result).toContain('is-inverted');
    expect(result).toContain('is-rounded');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { class: 'custom-class' }
    });

    expect(result).toContain('button');
    expect(result).toContain('is-primary');
    expect(result).toContain('custom-class');
  });

  it('renders slot content', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      slots: { default: 'Click me!' }
    });

    expect(result).toContain('Click me!');
  });

  it('spreads additional attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        'aria-label': 'My Button',
        id: 'btn-1',
        type: 'submit'
      }
    });

    expect(result).toContain('aria-label="My Button"');
    expect(result).toContain('id="btn-1"');
    expect(result).toContain('type="submit"');
  });
});
