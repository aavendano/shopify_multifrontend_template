import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRoutesConfig, getThemeConfig } from './config';
import { promises as fs } from 'fs';

vi.mock('fs', async (importOriginal) => {
    const actual = await importOriginal<typeof import('fs')>();
    return {
        ...actual,
        promises: {
            ...actual.promises,
            readFile: vi.fn(),
            readdir: vi.fn(),
            stat: vi.fn(),
            access: vi.fn(),
        }
    };
});

describe('Config Loader Error Handling', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should throw error when routes config is missing', async () => {
        const error = new Error('ENOENT');
        (error as any).code = 'ENOENT';
        vi.mocked(fs.readFile).mockRejectedValue(error);

        await expect(getRoutesConfig('non-existent-site')).rejects.toThrowError(/Routes config not found for site: non-existent-site/);
    });

    it('should throw error when theme config is missing', async () => {
        const error = new Error('ENOENT');
        (error as any).code = 'ENOENT';
        vi.mocked(fs.readFile).mockRejectedValue(error);

        await expect(getThemeConfig('non-existent-site')).rejects.toThrowError(/Theme config not found for site: non-existent-site/);
    });
});
