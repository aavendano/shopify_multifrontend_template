import { describe, it, expect, vi, afterEach } from 'vitest';
import { getThemeConfig } from './config';
import { promises as fs } from 'fs';
import path from 'path';

vi.mock('fs', async (importOriginal) => {
    const actual = await importOriginal<typeof import('fs')>();
    return {
        ...actual,
        promises: {
            ...actual.promises,
            readFile: vi.fn(),
        }
    };
});

describe('Config Path Traversal Vulnerability', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should not allow path traversal in siteId', async () => {
        const maliciousSiteId = '../secrets';

        // This should fail or be caught
        try {
            await getThemeConfig(maliciousSiteId);
        } catch (error: any) {
            // If it's fixed, it might throw a specific error or ENOENT if it tried to read but failed
            // The goal is to see where it TRIED to read.
        }

        // Check what path was actually called
        const SITES_DIR = path.resolve('./sites');
        const expectedPath = path.join(SITES_DIR, maliciousSiteId, 'theme.config.json');

        // If the vulnerability exists, fs.readFile will be called with the traversed path
        // We want it to NOT be called with that path, or for the function to throw before calling it.
        expect(vi.mocked(fs.readFile)).not.toHaveBeenCalledWith(expectedPath, 'utf-8');
    });

    it('should throw an error for invalid site ID with path traversal', async () => {
        const maliciousSiteId = '../secrets';
        await expect(getThemeConfig(maliciousSiteId)).rejects.toThrowError(`Invalid site ID: ${maliciousSiteId}`);
    });
});
