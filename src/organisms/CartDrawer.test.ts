import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import CartDrawer from './CartDrawer.astro';

describe('CartDrawer', () => {
  const mockItems = [
    {
      id: 'item-1',
      productId: 'prod-1',
      title: 'Cool Widget',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBmaWxsPSIjY2NjIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg==',
      formattedPrice: '$19.99',
      quantity: 2,
    },
    {
      id: 'item-2',
      productId: 'prod-2',
      title: 'Awesome Gadget',
      variantTitle: 'Blue',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBmaWxsPSIjY2NjIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIvPjwvc3ZnPg==',
      formattedPrice: '$29.99',
      quantity: 1,
    }
  ];

  it('renders closed by default', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CartDrawer, {
      props: {
        isOpen: false,
        items: [],
        formattedSubtotal: '$0.00'
      }
    });

    expect(result).not.toContain('is-active');
  });

  it('renders open when isOpen is true', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CartDrawer, {
      props: {
        isOpen: true,
        items: [],
        formattedSubtotal: '$0.00'
      }
    });

    expect(result).toContain('is-active');
  });

  it('renders empty cart message when items array is empty', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CartDrawer, {
      props: {
        isOpen: true,
        items: [],
        formattedSubtotal: '$0.00'
      }
    });

    expect(result).toContain('Your cart is empty.');
    expect(result).toContain('disabled'); // Checkout button should be disabled
  });

  it('renders cart items correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CartDrawer, {
      props: {
        isOpen: true,
        items: mockItems,
        formattedSubtotal: '$69.97'
      }
    });

    // Check item 1
    expect(result).toContain('Cool Widget');
    expect(result).toContain('Qty: 2');
    expect(result).toContain('$19.99');

    // Check item 2
    expect(result).toContain('Awesome Gadget');
    expect(result).toContain('Blue'); // Variant title
    expect(result).toContain('Qty: 1');
    expect(result).toContain('$29.99');

    // Subtotal
    expect(result).toContain('$69.97');

    // Checkout button should not be disabled
    expect(result).not.toContain('disabled="disabled"'); // Astro renders boolean attr as string or bare
  });
});
