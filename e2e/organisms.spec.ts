import { test, expect } from '@playwright/test';

test.describe('Organisms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-organisms');
    // Wait for the log element to be present
    await page.waitForSelector('#event-log');
  });

  test('ProductDetails emits add-to-cart', async ({ page }) => {
    const addBtn = page.locator('.product-details .add-to-cart-btn');
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: add-to-cart');
    await expect(log).toContainText('p1');
  });

  test('FiltersPanel emits filter-change', async ({ page }) => {
    const searchInput = page.locator('input[name="search"]');
    await searchInput.scrollIntoViewIfNeeded();
    await searchInput.fill('widget');

    const applyBtn = page.locator('button:has-text("Apply Filters")');
    await applyBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: filter-change');
    await expect(log).toContainText('widget');
  });

  test('ProductGallery handles interactions and states', async ({ page }) => {
    const gallery = page.locator('.product-gallery');
    await gallery.scrollIntoViewIfNeeded();

    const thumbnails = gallery.locator('.thumbnail-btn');

    // Initial state: first thumbnail should be selected
    await expect(thumbnails.nth(0)).toHaveClass(/is-primary/);
    await expect(thumbnails.nth(0)).toHaveClass(/is-selected/);
    await expect(thumbnails.nth(1)).not.toHaveClass(/is-primary/);

    // Click second thumbnail
    const secondThumbnail = thumbnails.nth(1);
    await secondThumbnail.click();

    // Verify visual state updated
    await expect(thumbnails.nth(0)).not.toHaveClass(/is-primary/);
    await expect(thumbnails.nth(0)).not.toHaveClass(/is-selected/);
    await expect(secondThumbnail).toHaveClass(/is-primary/);
    await expect(secondThumbnail).toHaveClass(/is-selected/);

    // Verify event emitted with correct payload
    // We expect the image data URI as the src
    const src = await secondThumbnail.getAttribute('data-src');
    const expectedPayload = JSON.stringify({ src });

    const log = page.locator('#event-log');
    await expect(log).toContainText(`Event: image-change ${expectedPayload}`);
  });

  test('Header emits cart-open and CartDrawer opens', async ({ page }) => {
    const cartBtn = page.locator('.cart-toggle-btn');
    await cartBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: cart-open');

    // Check drawer visible
    const drawer = page.locator('.cart-drawer-overlay');
    await expect(drawer).toHaveClass(/is-active/);
  });

  test('CartDrawer handles close event via button', async ({ page }) => {
    // Open cart first
    const cartBtn = page.locator('.cart-toggle-btn');
    await cartBtn.click();
    const drawer = page.locator('.cart-drawer-overlay');
    await expect(drawer).toHaveClass(/is-active/);

    // Click close button
    const closeBtn = drawer.locator('.close-btn');
    await closeBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: close (cart)');

    // Drawer should no longer be active
    await expect(drawer).not.toHaveClass(/is-active/);
  });

  test('CartDrawer handles close event via modal background', async ({ page }) => {
    // Open cart first
    const cartBtn = page.locator('.cart-toggle-btn');
    await cartBtn.click();
    const drawer = page.locator('.cart-drawer-overlay');
    await expect(drawer).toHaveClass(/is-active/);

    // Click background
    const background = drawer.locator('.modal-background');
    await background.click({ position: { x: 10, y: 10 } });

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: close (cart)');

    // Drawer should no longer be active
    await expect(drawer).not.toHaveClass(/is-active/);
  });

  test('CartDrawer handles remove-item event', async ({ page }) => {
    // Open cart
    const cartBtn = page.locator('.cart-toggle-btn');
    await cartBtn.click();

    // Click remove on the first item
    const drawer = page.locator('.cart-drawer-overlay');
    const removeBtn = drawer.locator('.remove-item-btn').first();
    await removeBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: remove-item');
    await expect(log).toContainText('c1');
  });

  test('CartDrawer handles checkout event', async ({ page }) => {
    // Open cart
    const cartBtn = page.locator('.cart-toggle-btn');
    await cartBtn.click();

    // Click checkout
    const drawer = page.locator('.cart-drawer-overlay');
    const checkoutBtn = drawer.locator('.checkout-btn');
    await checkoutBtn.click();

    // Check log
    const log = page.locator('#event-log');
    await expect(log).toContainText('Event: checkout');
  });
});
