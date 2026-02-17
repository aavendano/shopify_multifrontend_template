import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import CardContent from './CardContent.astro';

describe('CardContent', () => {
  it('renders content', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(CardContent, {
      props: { title: 'Title', price: 100 }
    });
    expect(result).toContain('Title');
    expect(result).toContain('$100.00');
  });
});
