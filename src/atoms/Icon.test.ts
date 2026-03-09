import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, describe } from 'vitest';
import Icon from './Icon.astro';

describe('Icon', () => {
  test('renders standard icon correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' },
    });

    expect(result).toMatch(/<span class="icon"[^>]*>/);
    expect(result).toContain('<circle cx="9" cy="21" r="1" />');
    expect(result).toContain('<circle cx="20" cy="21" r="1" />');
    // Ensure standard SVG attributes
    expect(result).toContain('viewBox="0 0 24 24"');
    expect(result).toContain('stroke="currentColor"');
  });

  test('renders loader icon with fa-spin class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'loader' },
    });

    expect(result).toContain('class="fa-spin"');
    expect(result).toContain('<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />');
  });

  test('applies size class correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'search', size: 'small' },
    });

    expect(result).toMatch(/<span class="icon is-small"[^>]*>/);
  });

  test('applies color class correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'user', color: 'primary' },
    });

    expect(result).toMatch(/<span class="icon has-text-primary"[^>]*>/);
  });

  test('appends custom class correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'menu', class: 'custom-icon-class' },
    });

    expect(result).toMatch(/<span class="icon custom-icon-class"[^>]*>/);
  });

  test('includes aria-hidden="true" attribute', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'close' },
    });

    expect(result).toContain('aria-hidden="true"');
  });
});
