import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Image from './Image.astro';

describe('Image Atom', () => {
  it('renders correctly with required props', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
      }
    });

    expect(result).toContain('src="test.jpg"');
    expect(result).toContain('alt="Test Image"');
    expect(result).toContain('class="image"'); // Default wrapper class
    expect(result).toContain('object-fit: cover;'); // Default fit
  });

  it('applies ratio class and styles correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        ratio: '16by9'
      }
    });

    expect(result).toContain('is-16by9');
    expect(result).toContain('width: 100%;');
    expect(result).toContain('height: 100%;');
  });

  it('applies fit style correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        fit: 'contain'
      }
    });

    expect(result).toContain('object-fit: contain;');
  });

  it('applies rounded class when rounded is true', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        rounded: true
      }
    });

    expect(result).toContain('is-rounded');
  });

  it('merges custom classes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        class: 'custom-class'
      }
    });

    expect(result).toContain('custom-class');
  });

  it('spreads extra attributes to the img tag', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        'data-testid': 'test-img'
      }
    });

    expect(result).toContain('data-testid="test-img"');
  });

  it('includes loading="lazy" and decoding="async" by default', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
      }
    });

    expect(result).toContain('loading="lazy"');
    expect(result).toContain('decoding="async"');
  });

  it('allows overriding loading and decoding attributes', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        loading: 'eager',
        decoding: 'sync'
      }
    });

    expect(result).toContain('loading="eager"');
    expect(result).toContain('decoding="sync"');
  });
});
