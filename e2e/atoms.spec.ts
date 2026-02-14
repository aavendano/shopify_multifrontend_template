import { test, expect } from '@playwright/test';

test('Atoms Gallery loads', async ({ page }) => {
  await page.goto('/test-atoms');
  await expect(page).toHaveTitle(/Atoms Test/);
  await expect(page.locator('h1')).toContainText('Atoms Gallery');

  // Check for buttons
  await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();

  // Check for input
  await expect(page.locator('input[placeholder="Enter username"]')).toBeVisible();

  // Check for badge
  await expect(page.locator('.tag.is-info')).toContainText('Info');

  // Check for price
  await expect(page.locator('.price-label .is-size-5')).toContainText('$19.99');
});
