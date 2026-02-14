import fs from 'fs';
import path from 'path';

const SITES_DIR = path.resolve('./sites');

export interface SiteConfig {
  siteId: string;
  name: string;
  colors: Record<string, string>;
  typography: Record<string, string>;
}

export interface RouteConfig {
  path: string;
  template: string;
  meta: Record<string, string>;
}

export interface SiteRoutes {
  routes: RouteConfig[];
}

export function getSites(): string[] {
  if (!fs.existsSync(SITES_DIR)) {
    return [];
  }
  return fs.readdirSync(SITES_DIR).filter(file => {
    return fs.statSync(path.join(SITES_DIR, file)).isDirectory();
  });
}

export function getThemeConfig(siteId: string): SiteConfig {
  const configPath = path.join(SITES_DIR, siteId, 'theme.config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Theme config not found for site: ${siteId}`);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

export function getRoutesConfig(siteId: string): SiteRoutes {
  const configPath = path.join(SITES_DIR, siteId, 'routes.config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Routes config not found for site: ${siteId}`);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}
