import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.astro';

describe('Icon', () => {
  it('renders specific icon', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' }
    });
    // Check for unique part of cart SVG path
    expect(result).toContain('<circle cx="9" cy="21" r="1" />');
    expect(result).toContain('<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />');
  });

  it('applies size classes', async () => {
    const container = await experimental_AstroContainer.create();

    const small = await container.renderToString(Icon, {
      props: { name: 'check', size: 'small' }
    });
    expect(small).toContain('is-small');

    const large = await container.renderToString(Icon, {
      props: { name: 'check', size: 'large' }
    });
    expect(large).toContain('is-large');
  });

  it('applies color classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'user', color: 'primary' }
    });
    expect(result).toContain('has-text-primary');
  });

  it('applies custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'menu', class: 'custom-class' }
    });
    expect(result).toContain('custom-class');
  });

  it('applies fa-spin class to loader icon', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'loader' }
    });
    expect(result).toContain('fa-spin');
  });

  it('does not apply fa-spin class to other icons', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Icon, {
      props: { name: 'cart' }
    });
    expect(result).not.toContain('fa-spin');
  });
});
