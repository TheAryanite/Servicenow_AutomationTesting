// Scenario 4

import { test, expect } from '@playwright/test';

test("Service now - Assign Role to User", async ({ page }) => {
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

  const searchBox = frame.getByRole('searchbox', { name: 'Search column: user id' });

  await searchBox.fill('a.bob');
  await searchBox.press('Enter');
  await page.waitForTimeout(3000);

  await frame.locator('a.linked.formlink').first().click();

  await frame.getByRole('tab', { name: 'Roles' }).click();
  await page.waitForTimeout(2000);

  await frame.getByRole('button', { name: 'Edit...' }).click();
  await page.waitForTimeout(2000);

  const editFrame = page.frameLocator('#gsft_main');

  await editFrame.locator('select#select_0').selectOption({ label: 'actsub_user' });
  await page.waitForTimeout(1000);
  
  await editFrame.locator('#add_to_collection_button').click();
  await page.waitForTimeout(1000);

  await editFrame.locator('#select_0_sysverb_save').click();
  await page.waitForTimeout(2000);

   await expect(frame.locator('a.linked', { hasText: 'actsub_user' })).toBeVisible();

});