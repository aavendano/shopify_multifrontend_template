import { test, expect } from '@playwright/test';

test.describe('Performance Benchmark: CartDrawer Remove Item Listeners', () => {
  test('baseline measure', async ({ page }) => {
    await page.goto('/test-organisms');
    await page.waitForLoadState('networkidle');

    const perfData = await page.evaluate(() => {
      const cartBody = document.querySelector('.cart-drawer-overlay .modal-card-body');
      if (!cartBody) return { error: 'Cart body not found' };

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
      cartBody.innerHTML = htmlString;

      const overlay = document.querySelector('.cart-drawer-overlay');
      if (!overlay) return { error: 'Overlay not found' };

      performance.mark('start-attach');

      overlay.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          overlay.dispatchEvent(new CustomEvent('remove-item', {
            detail: { id },
            bubbles: true
          }));
        });
      });

      performance.mark('end-attach');
      performance.measure('attach-listeners', 'start-attach', 'end-attach');

      const measure = performance.getEntriesByName('attach-listeners')[0];
      return { duration: measure.duration };
    });

    console.log(`Baseline Time for 1000 items: ${perfData.duration} ms`);
    expect(perfData.error).toBeUndefined();
    expect(perfData.duration).toBeGreaterThanOrEqual(0);
  });

  test('optimized measure', async ({ page }) => {
    await page.goto('/test-organisms');
    await page.waitForLoadState('networkidle');

    const perfData = await page.evaluate(() => {
      const cartBody = document.querySelector('.cart-drawer-overlay .modal-card-body');
      if (!cartBody) return { error: 'Cart body not found' };

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
      cartBody.innerHTML = htmlString;

      const overlay = document.querySelector('.cart-drawer-overlay');
      if (!overlay) return { error: 'Overlay not found' };

      performance.mark('start-attach');

      const modalBody = overlay.querySelector('.modal-card-body');
      if (modalBody) {
        modalBody.addEventListener('click', (e) => {
          const btn = (e.target as HTMLElement).closest('.remove-item-btn');
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
