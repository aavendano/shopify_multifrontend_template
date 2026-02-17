import { test, expect } from '@playwright/test';

test.describe('Molecules', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-molecules');
  });

  test('VariantSelector interaction', async ({ page }) => {
    const variantOutput = page.locator('#variant-output');
    await expect(variantOutput).toContainText('Selected: m');

    // Click 'Large' (value 'l')
    await page.locator('.variant-selector button:has-text("Large")').click();

    await expect(variantOutput).toContainText('Selected: l');

    // Verify class change
    const largeBtn = page.locator('.variant-selector button:has-text("Large")');
    await expect(largeBtn).toHaveClass(/is-primary/);

    const smallBtn = page.locator('.variant-selector button:has-text("Small")');
    await expect(smallBtn).not.toHaveClass(/is-primary/);
  });

  test('QuantitySelector interaction', async ({ page }) => {
    const quantityOutput = page.locator('#quantity-output');
    const input = page.locator('.quantity-selector input');
    const incBtn = page.locator('.quantity-selector .increment-btn');
    const decBtn = page.locator('.quantity-selector .decrement-btn');

    await expect(quantityOutput).toContainText('Quantity: 1');
    await expect(input).toHaveValue('1');
    await expect(decBtn).toBeDisabled();

    // Increment
    await incBtn.click();
    await expect(input).toHaveValue('2');
    await expect(quantityOutput).toContainText('Quantity: 2');
    await expect(decBtn).not.toBeDisabled();

    // Decrement
    await decBtn.click();
    await expect(input).toHaveValue('1');
    await expect(quantityOutput).toContainText('Quantity: 1');
    await expect(decBtn).toBeDisabled();
  });
});
