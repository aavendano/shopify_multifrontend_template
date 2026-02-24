import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Container from './Container.astro';

describe('Container', () => {
  it('renders default container class', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container);

    expect(result).toContain('class="container"');
    expect(result).toContain('<div');
  });

  it('renders fluid container', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container, {
      props: { fluid: true }
    });

    expect(result).toContain('is-fluid');
    expect(result).toContain('container');
  });

  it('renders breakpoint modifiers', async () => {
    const container = await experimental_AstroContainer.create();

    const widescreen = await container.renderToString(Container, {
      props: { breakpoint: 'widescreen' }
    });
    expect(widescreen).toContain('is-widescreen');

    const fullhd = await container.renderToString(Container, {
      props: { breakpoint: 'fullhd' }
    });
    expect(fullhd).toContain('is-fullhd');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container, {
      props: { class: 'custom-class' }
    });

    expect(result).toContain('custom-class');
    expect(result).toContain('container');
  });

  it('handles mixed props correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container, {
      props: {
        fluid: true,
        breakpoint: 'widescreen',
        class: 'mixed-test'
      }
    });

    expect(result).toContain('container');
    expect(result).toContain('is-fluid');
    expect(result).toContain('is-widescreen');
    expect(result).toContain('mixed-test');
  });

  it('spreads other attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container, {
      props: { 'data-testid': 'container-test', id: 'my-container' }
    });

    expect(result).toContain('data-testid="container-test"');
    expect(result).toContain('id="my-container"');
  });

  it('renders slot content', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Container, {
      slots: { default: '<span class="child">Content</span>' }
    });

    expect(result).toContain('<span class="child">Content</span>');
  });
});
