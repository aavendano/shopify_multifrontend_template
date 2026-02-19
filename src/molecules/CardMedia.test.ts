import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import CardMedia from './CardMedia.astro';

describe('CardMedia', () => {
  it('renders image', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CardMedia, {
      props: { src: 'img.jpg', alt: 'Alt text' }
    });
    expect(result).toContain('src="img.jpg"');
    expect(result).toContain('alt="Alt text"');
  });

  it('renders badge', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CardMedia, {
      props: { src: 'img.jpg', alt: 'Alt text', badgeText: 'New' }
    });
    expect(result).toContain('New');
    expect(result).toContain('badge-overlay');
  });
});
