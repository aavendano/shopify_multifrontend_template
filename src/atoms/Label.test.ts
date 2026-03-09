import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, describe } from 'vitest';
import Label from './Label.astro';

describe('Label', () => {
  test('renders default slot content', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Label, {
      slots: { default: 'Username' },
    });

    expect(result).toContain('<label');
    expect(result).toContain('Username');
    expect(result).toContain('class="label"');
    expect(result).not.toContain('<span class="has-text-danger ml-1"');
  });

  test('renders the "for" attribute correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Label, {
      props: { for: 'username-input' },
      slots: { default: 'Username' },
    });

    expect(result).toContain('for="username-input"');
  });

  test('appends custom class correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Label, {
      props: { class: 'custom-label-class' },
      slots: { default: 'Username' },
    });

    expect(result).toContain('class="label custom-label-class"');
  });

  test('renders the required asterisk when required is true', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Label, {
      props: { required: true },
      slots: { default: 'Username' },
    });

    // We can't use an exact full string match since Astro appends 'data-astro-source' attrs in dev.
    expect(result).toContain('class="has-text-danger ml-1"');
    expect(result).toMatch(/<span[^>]*class="has-text-danger ml-1"[^>]*>\s*\*\s*<\/span>/);
  });

  test('spreads additional attributes to the label element', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Label, {
      props: { 'data-testid': 'test-label' },
      slots: { default: 'Username' },
    });

    expect(result).toContain('data-testid="test-label"');
  });
});
