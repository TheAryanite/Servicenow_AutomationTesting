// Scenario 9

import { test, expect } from '@playwright/test';

test("Service now - Search Using Multiple Filters", async ({ page }) => {
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

  await mainFrame.locator('#s2id_autogen2_search').fill('User ID');
  
  await mainFrame.locator('.select2-results .select2-result-selectable')
    .filter({ hasText: /^User ID$/ })
    .click();

  await mainFrame.locator('input.filerTableInput').fill('a.bob');
  await page.keyboard.press('Tab');

  await mainFrame.locator('button[data-original-title="Add AND condition"]').click();

  await mainFrame.locator('.select2-choice').last().click();

  await mainFrame.locator('.select2-search input').last().fill('Name');

  await mainFrame.locator('.select2-results .select2-result-selectable')
    .filter({ hasText: /^Name$/ })
    .click();
  
  await mainFrame.locator('input.filerTableInput').last().fill('Tester man');

  await mainFrame.locator('button[data-original-title="Add AND condition"]').last().click();

  await mainFrame.locator('.select2-choice').last().click();

  await mainFrame.locator('.select2-search input').last().fill('Email');

  await mainFrame.locator('.select2-results .select2-result-selectable')
    .filter({ hasText: /^Email$/ })
    .click();
  
  await mainFrame.locator('input.filerTableInput').last().fill('tester1234@gmail.com');  

  await mainFrame.locator('#test_filter_action_toolbar_run').click();

  await expect(
    mainFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
   .filter({ hasText: 'a.bob' })
  ).toBeVisible();

  await expect(
    mainFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
      .filter({ hasText: 'Tester man' })
  ).toBeVisible();

  await expect(
    mainFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
      .filter({ hasText: 'tester1234@gmail.com' })
  ).toBeVisible();

  await page.waitForTimeout(6000);


});