// Scenario 2
import { test, expect } from '@playwright/test';

test("Service now - Duplicate User Validation", async ({ page }) => {
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

  await frame.locator('#sys_user\\.user_name').fill('Tester.test');

  await frame.locator('#sysverb_insert').click();

  const errorMessage = frame.locator('.outputmsg_text');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Invalid insert');
  await page.waitForTimeout(6000);


});