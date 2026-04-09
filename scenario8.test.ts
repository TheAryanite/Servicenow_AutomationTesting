// Scenario 8

import { test, expect } from '@playwright/test';

test("Service now - Search User by Name", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://dev275018.service-now.com');

  await page.getByRole('textbox', { name: 'User name' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('3ai4VlLdJ-/R');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await page.getByRole('menuitem', { name: 'All' }).click();

  await page.getByRole('textbox', { name: 'Enter search term to filter all menu' }).fill('Users');

  await page.getByRole('link', { name: 'Users' }).nth(5).click();
  await page.waitForTimeout(5000);

  const mainFrame = page.frameLocator('iframe[name="gsft_main"]');

  await mainFrame.locator('#sys_user_filter_toggle_image').click();

  await mainFrame.locator('.select2-choice').first().click();

  await mainFrame.locator('#s2id_autogen2_search').fill('Name');

  await mainFrame.locator('.select2-results .select2-result-selectable')
    .filter({ hasText: /^Name$/ })
    .click();

  await mainFrame.locator('input.filerTableInput').fill('Tester man');

  await mainFrame.locator('#test_filter_action_toolbar_run').click();

  const frame = page.frameLocator('iframe[name="gsft_main"]');

  await expect(
    frame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]').nth(1)
  ).toHaveText('Tester man');


});