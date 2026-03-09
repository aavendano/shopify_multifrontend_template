import { test, expect } from '@playwright/test';

test.describe('Performance Benchmarks', () => {
  test('FiltersPanel render time', async ({ page }) => {
    // Navigate to a page containing the FiltersPanel component
    await page.goto('/test-organisms');

    // Wait for the FiltersPanel to be present in the DOM
    const filtersPanel = page.locator('.filters-panel');
    await filtersPanel.waitFor();

    // Read the data-render-time attribute
    const renderTimeStr = await filtersPanel.getAttribute('data-render-time');

    expect(renderTimeStr).not.toBeNull();

    const renderTime = parseFloat(renderTimeStr!);
    console.log(`[BENCHMARK] FiltersPanel baseline render time: ${renderTime.toFixed(4)}ms`);

    // Validate we got a valid number
    expect(isNaN(renderTime)).toBe(false);
  });
});
