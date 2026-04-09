// Scenario 3

import { test, expect } from '@playwright/test';

test("Service now - Edit User Details", async ({ page }) => {
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

  await searchBox.fill('Tester.test');
  await searchBox.press('Enter');
  await page.waitForTimeout(3000);

  await frame.locator('a.linked.formlink').first().click();

  await frame.locator('#sys_user\\.user_name').fill('a.bob');
  await frame.locator('#sys_user\\.first_name').fill('Tester');
  await frame.locator('#sys_user\\.last_name').fill('man');
  await frame.locator('#sys_user\\.email').fill('tester1234@gmail.com');

  await frame.locator('#sysverb_update').click();

  const newFrame = page.frameLocator('iframe[name="gsft_main"]');

  const newSearchBox = frame.getByRole('searchbox', { name: 'Search column: user id' });

  await newSearchBox.fill('a.bob');
  await newSearchBox.press('Enter');
  await page.waitForTimeout(6000);

  await expect(
    newFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
   .filter({ hasText: 'a.bob' })
  ).toBeVisible();

  await expect(
    newFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
    .filter({ hasText: 'Tester man' })
  ).toBeVisible();

  await expect(
    newFrame.locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
      .filter({ hasText: 'tester1234@gmail.com' })
  ).toBeVisible();
  

});