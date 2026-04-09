// Scenario 6

import { test, expect } from '@playwright/test';

test("Service now - Assign Title to User", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://dev275018.service-now.com');

  await page.getByRole('textbox', { name: 'User name' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('3ai4VlLdJ-/R');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await page.getByRole('menuitem', { name: 'All' }).click();

  await page.getByRole('textbox', { name: 'Enter search term to filter all menu' }).fill('Users');

  await page.getByRole('link', { name: 'Users' }).nth(5).click();
  await page.waitForTimeout(5000);

  const frame = page.frameLocator('#gsft_main');
  await frame.getByRole('button', { name: 'New' }).click();

  await frame.locator('#sys_user\\.user_name').fill('a.title');
  await frame.locator('#sys_user\\.title').fill('IT Technician');
  await page.waitForTimeout(2000);

  await frame.locator('#sysverb_insert').click();
  await page.waitForTimeout(10000);

  const newFrame = page.frameLocator('#gsft_main');

  const searchBox = newFrame.getByRole('searchbox', { name: 'Search column: user id' });

  await searchBox.fill('a.title');
  await searchBox.press('Enter');
  await page.waitForTimeout(3000);

  await frame.locator('a.linked.formlink').first().click();

  const titleField = frame.locator('#sys_user\\.title');
  await expect(titleField).toBeVisible({ timeout: 10000 });
  await expect(titleField).toHaveValue('IT Technician');

});