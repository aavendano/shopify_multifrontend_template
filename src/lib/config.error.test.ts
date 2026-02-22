import { describe, it, expect, vi, afterEach } from 'vitest';
import fs from 'fs';
import { getRoutesConfig, getThemeConfig } from './config';

// Mock fs module because it is a default export and read-only in ESM
vi.mock('fs', async (importOriginal) => {
    const actual = await importOriginal<typeof import('fs')>();
    return {
        ...actual,
        default: {
            ...actual,
            existsSync: vi.fn(), // We'll mock this per test or globally
            readFileSync: vi.fn(),
        }
    };
});

describe('Config Loader Error Handling', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should throw error when routes config is missing', () => {
        // Simulate missing file
        vi.mocked(fs.existsSync).mockReturnValue(false);

        expect(() => getRoutesConfig('non-existent-site')).toThrowError(/Routes config not found for site: non-existent-site/);
    });

    it('should throw error when theme config is missing', () => {
        // Simulate missing file
        vi.mocked(fs.existsSync).mockReturnValue(false);

        expect(() => getThemeConfig('non-existent-site')).toThrowError(/Theme config not found for site: non-existent-site/);
    });
});
