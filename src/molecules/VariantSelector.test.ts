import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import VariantSelector from './VariantSelector.astro';

describe('VariantSelector', () => {
  it('renders options', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(VariantSelector, {
      props: {
        options: [{ label: 'Small', value: 's' }, { label: 'Medium', value: 'm' }],
        selected: 'm'
      }
    });
    expect(result).toContain('Small');
    expect(result).toContain('Medium');
    // Check for selected state via class
    expect(result).toMatch(/class="[^"]*is-primary[^"]*"\s+[^>]*>[\s\n]*Medium/);
  });
});
