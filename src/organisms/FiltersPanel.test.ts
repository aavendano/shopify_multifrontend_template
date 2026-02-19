import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import FiltersPanel from './FiltersPanel.astro';

describe('FiltersPanel', () => {
  it('renders filters', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(FiltersPanel, {
      props: {
        filters: [
          { id: 'search', label: 'Search', type: 'text' },
          { id: 'cat', label: 'Category', type: 'checkbox', options: [{ label: 'A', value: 'a' }] }
        ],
        selectedFilters: {}
      }
    });

    expect(result).toContain('Search');
    expect(result).toContain('Category');
    expect(result).toContain('value="a"');
  });
});
