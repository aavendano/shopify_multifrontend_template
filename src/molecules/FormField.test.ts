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

  it('associates label and input with id', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(FormField, {
      props: { label: 'Email', id: 'email-field' }
    });
    expect(result).toContain('for="email-field"');
    expect(result).toContain('id="email-field"');
  });

  it('generates id if not provided', async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(FormField, {
      props: { label: 'Notes' }
    });
    // Check that an ID is generated and used in both places
    const idMatch = result.match(/id="(input-[^"]+)"/);
    expect(idMatch).not.toBeNull();
    if (idMatch) {
        expect(result).toContain(`for="${idMatch[1]}"`);
    }
  });
});
