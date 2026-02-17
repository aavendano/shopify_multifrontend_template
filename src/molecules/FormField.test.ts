import { experimental_AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import FormField from './FormField.astro';

describe('FormField', () => {
  it('renders label and input', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(FormField, {
      props: { label: 'Name', name: 'username' }
    });
    expect(result).toContain('Name');
    expect(result).toContain('name="username"');
  });

  it('renders error', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(FormField, {
      props: { label: 'Name', error: 'Required' }
    });
    expect(result).toContain('Required');
    expect(result).toContain('is-danger');
  });
});
