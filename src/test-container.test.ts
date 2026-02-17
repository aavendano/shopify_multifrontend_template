import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Button from './atoms/Button.astro';

describe('Button', () => {
  it('renders correctly', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { variant: 'primary' },
      slots: { default: 'Click me' }
    });
    expect(result).toContain('Click me');
    expect(result).toContain('is-primary');
  });
});
