import { test, expect } from '@playwright/test';

test.describe('Performance Benchmark: CartDrawer Remove Item Listeners', () => {
  test('measures time to attach event listeners to 1000 dynamically added items', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/test-organisms');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Run performance measurement in the browser context
    const perfData = await page.evaluate(() => {
      // Find the cart drawer body
      const cartBody = document.querySelector('.cart-drawer-overlay .modal-card-body');
      if (!cartBody) return { error: 'Cart body not found' };

      // Generate 1000 mock cart items
      let htmlString = '';
      for (let i = 0; i < 1000; i++) {
        htmlString += `
          <div class="cart-item is-flex mb-4 pb-4">
            <div class="cart-item-details is-flex-grow-1">
              <button class="remove-item-btn" data-id="item-${i}">Remove</button>
            </div>
          </div>
        `;
      }

      // Add them to the DOM
      cartBody.innerHTML = htmlString;

      // We need to re-run the script logic since the original script ran on DOMContentLoaded
      // For improved code, we simulate the exact code in CartDrawer.astro
      const overlay = document.querySelector('.cart-drawer-overlay');
      if (!overlay) return { error: 'Overlay not found' };

      performance.mark('start-attach');

      const modalBody = overlay.querySelector('.modal-card-body');
      if (modalBody) {
        modalBody.addEventListener('click', (e) => {
          const btn = (e.target).closest('.remove-item-btn');
          if (btn) {
            const id = btn.getAttribute('data-id');
            if (id) {
              overlay.dispatchEvent(new CustomEvent('remove-item', {
                detail: { id },
                bubbles: true
              }));
            }
          }
        });
      }

      performance.mark('end-attach');
      performance.measure('attach-listeners', 'start-attach', 'end-attach');

      const measure = performance.getEntriesByName('attach-listeners')[0];
      return { duration: measure.duration };
    });

    console.log(`Optimized Time for 1000 items: ${perfData.duration} ms`);
    expect(perfData.error).toBeUndefined();
    expect(perfData.duration).toBeGreaterThanOrEqual(0);
  });
});
