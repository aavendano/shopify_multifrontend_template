import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import BaseLayout from './BaseLayout.astro';

describe('BaseLayout', () => {
  it('includes CSP meta tag', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(BaseLayout, {
      props: { title: 'Test Title' },
      slots: { default: 'Test Content' }
    });

    expect(result).toContain('Test Content');
    // Ensure CSP meta tag exists with appropriate directives
    expect(result).toMatch(/<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"/);
    expect(result).toContain("default-src 'self'");
    expect(result).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(result).toContain("style-src 'self' 'unsafe-inline'");
    expect(result).toContain("img-src 'self' data: https:");
    expect(result).toContain("object-src 'none'");
    expect(result).toContain("base-uri 'self'");
    expect(result).toContain("form-action 'self'");
    expect(result).toContain("upgrade-insecure-requests");
  });
});
