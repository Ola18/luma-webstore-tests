import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Home Page');
});
