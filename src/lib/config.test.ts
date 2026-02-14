import { describe, it, expect } from 'vitest';
import { getSites, getThemeConfig, getRoutesConfig } from './config';

describe('Config Loader', () => {
  it('should list available sites', () => {
    const sites = getSites();
    expect(sites).toContain('demo-store');
  });

  it('should load theme config for demo-store', () => {
    const config = getThemeConfig('demo-store');
    expect(config.siteId).toBe('demo-store');
    expect(config.colors).toBeDefined();
  });

  it('should load routes config for demo-store', () => {
    const config = getRoutesConfig('demo-store');
    expect(config.routes).toBeDefined();
    expect(config.routes.length).toBeGreaterThan(0);
  });
});
