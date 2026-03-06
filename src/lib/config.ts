import { promises as fs } from 'fs';
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

let sitesCache: string[] | null = null;
const siteConfigCache: Record<string, SiteConfig> = {};
const siteRoutesCache: Record<string, SiteRoutes> = {};

export async function getSites(): Promise<string[]> {
  if (sitesCache !== null) {
    return sitesCache;
  }

  try {
    const files = await fs.readdir(SITES_DIR);
    const sites = await Promise.all(files.map(async (file: string) => {
      try {
        const stat = await fs.stat(path.join(SITES_DIR, file));
        return stat.isDirectory() ? file : null;
      } catch {
        return null;
      }
    }));

    const validSites = sites.filter((site: string | null): site is string => site !== null);
    sitesCache = validSites;
    return validSites;
  } catch (error) {
    return [];
  }
}

export async function getThemeConfig(siteId: string): Promise<SiteConfig> {
  if (siteConfigCache[siteId]) {
    return siteConfigCache[siteId];
  }

  const configPath = path.join(SITES_DIR, siteId, 'theme.config.json');
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(content);
    siteConfigCache[siteId] = config;
    return config;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Theme config not found for site: ${siteId}`);
    }
    throw error;
  }
}

export async function getRoutesConfig(siteId: string): Promise<SiteRoutes> {
  if (siteRoutesCache[siteId]) {
    return siteRoutesCache[siteId];
  }

  const configPath = path.join(SITES_DIR, siteId, 'routes.config.json');
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(content);
    siteRoutesCache[siteId] = config;
    return config;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Routes config not found for site: ${siteId}`);
    }
    throw error;
  }
}
