// Scenario 1
import { test, expect } from '@playwright/test';

test("Service now - Create User", async ({ page }) => {
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
  await frame.locator('#sys_user\\.first_name').fill('Test');
  await frame.locator('#sys_user\\.last_name').fill('Data');
  await frame.locator('#sys_user\\.email').fill('test123@gmail.com');

  await frame.locator('#sysverb_insert').click();
  await page.waitForTimeout(6000);

  await expect(frame.locator('.outputmsg_text')).toBeVisible();
  await expect(frame.locator('.outputmsg_text')).toContainText('created for Test Data');

});