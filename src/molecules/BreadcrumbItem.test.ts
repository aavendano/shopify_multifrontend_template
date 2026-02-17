import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import BreadcrumbItem from './BreadcrumbItem.astro';

describe('BreadcrumbItem', () => {
  it('renders link', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(BreadcrumbItem, {
      props: { label: 'Home', href: '/' }
    });
    expect(result).toContain('href="/"');
    expect(result).toContain('Home');
    expect(result).not.toContain('is-active');
  });

  it('renders active item', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(BreadcrumbItem, {
      props: { label: 'Current', href: '#', isActive: true }
    });
    expect(result).toContain('is-active');
    expect(result).toContain('aria-current="page"');
  });
});
