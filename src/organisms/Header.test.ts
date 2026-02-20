import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Header from './Header.astro';

describe('Header', () => {
  it('renders logo and nav items', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: {
        logo: 'MyStore',
        navItems: [{ label: 'Home', href: '/' }]
      }
    });

    expect(result).toContain('MyStore');
    expect(result).toContain('Home');
    expect(result).not.toContain('cart-badge');
  });

  it('renders cart badge', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: {
        logo: 'MyStore',
        navItems: [],
        cartCount: 3,
        showCartBadge: true
      }
    });

    expect(result).toContain('cart-badge');
    expect(result).toContain('3');
  });
});
