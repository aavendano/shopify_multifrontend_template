import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/test-organisms');
  await page.screenshot({ path: 'verification.png', fullPage: true });
  await browser.close();
})();
