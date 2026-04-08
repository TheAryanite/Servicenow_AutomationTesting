import { Page, FrameLocator, expect } from "@playwright/test";

export class UsersPage {
  private frame: FrameLocator;

  constructor(public page: Page) {
    this.frame = this.page.frameLocator("#gsft_main");
  }


  async navigateToUsers() {
    await this.page.getByRole("link", { name: "Users" }).nth(5).click();
    await this.page.waitForTimeout(5000);
  }


  async clickNew() {
    await this.frame.getByRole("button", { name: "New" }).click();
  }

  async fillUserName(value: string) {
    await this.frame.locator("#sys_user\\.user_name").fill(value);
  }

  async fillFirstName(value: string) {
    await this.frame.locator("#sys_user\\.first_name").fill(value);
  }

  async fillLastName(value: string) {
    await this.frame.locator("#sys_user\\.last_name").fill(value);
  }

  async fillEmail(value: string) {
    await this.frame.locator("#sys_user\\.email").fill(value);
  }

  async fillTitle(value: string) {
    await this.frame.locator("#sys_user\\.title").fill(value);
  }

  async fillDepartment(value: string) {
    await this.frame
      .locator("#sys_display\\.sys_user\\.department")
      .fill(value);
  }

  async clickInsert() {
    await this.frame.locator("#sysverb_insert").click();
  }

  async clickUpdate() {
    await this.frame.locator("#sysverb_update").click();
  }

  async clickDelete() {
    await this.frame.locator("#sysverb_delete").click();
  }

  async confirmDelete() {
    await this.frame.locator("#ok_button").click();
  }


  async searchByUserId(userId: string) {
    const searchBox = this.frame.getByRole("searchbox", {
      name: "Search column: user id",
    });
    await searchBox.fill(userId);
    await searchBox.press("Enter");
    await this.page.waitForTimeout(3000);
  }

  async clickFirstResult() {
    await this.frame.locator("a.linked.formlink").first().click();
  }


  async openAdvancedFilter() {
    await this.page
      .frameLocator('iframe[name="gsft_main"]')
      .locator("#sys_user_filter_toggle_image")
      .click();
    await this.page.waitForTimeout(1500);
  }

  async addFilterCondition(
    fieldLabel: string,
    value: string,
    isFirst = true
  ) {
    const mf = this.page.frameLocator('iframe[name="gsft_main"]');

    if (!isFirst) {
      const andBtn = mf.locator([
        'button[data-original-title="Add AND condition"]',
        'button[title="Add AND condition"]',
        'button.add_filter_button',
        'a[data-action="add_filter"]',
        'button:has-text("and")',
      ].join(', ')).last();

      await andBtn.waitFor({ state: "visible", timeout: 15000 });
      await andBtn.click();
      await this.page.waitForTimeout(1000);
    }

    await mf.locator(".select2-choice").last().click();
    await this.page.waitForTimeout(500);

    await mf.locator(".select2-search input").last().fill(fieldLabel);
    await this.page.waitForTimeout(500);

    await mf
      .locator(".select2-results .select2-result-selectable")
      .filter({ hasText: new RegExp(`^${fieldLabel}$`) })
      .click();

    await this.page.waitForTimeout(500);

    await mf.locator("input.filerTableInput").last().fill(value);
    await this.page.waitForTimeout(500);
  }

  async runFilter() {
    await this.page
      .frameLocator('iframe[name="gsft_main"]')
      .locator("#test_filter_action_toolbar_run")
      .click();
    await this.page.waitForTimeout(3000);
  }


  async openRolesTab() {
    await this.frame.getByRole("tab", { name: "Roles" }).click();
    await this.page.waitForTimeout(2000);
  }

  async clickEditRoles() {
    await this.frame.getByRole("button", { name: "Edit..." }).click();
    await this.page.waitForTimeout(2000);
  }

  async assignRole(roleLabel: string) {
    const ef = this.page.frameLocator("#gsft_main");
    await ef.locator("select#select_0").selectOption({ label: roleLabel });
    await this.page.waitForTimeout(1000);
    await ef.locator("#add_to_collection_button").click();
    await this.page.waitForTimeout(1000);
    await ef.locator("#select_0_sysverb_save").click();
    await this.page.waitForTimeout(2000);
  }

  async removeRole(roleLabel: string) {
    const ef = this.page.frameLocator("#gsft_main");
    await ef.locator("select#select_1").selectOption({ label: roleLabel });
    await this.page.waitForTimeout(1000);
    await ef.locator("#remove_from_collection_button").click();
    await this.page.waitForTimeout(1000);
    await ef.locator("#select_0_sysverb_save").click();
    await this.page.waitForTimeout(2000);
  }


  async verifySuccessMessage(expectedText: string) {
    await expect(this.frame.locator(".outputmsg_text")).toBeVisible();
    await expect(this.frame.locator(".outputmsg_text")).toContainText(
      expectedText
    );
  }

  async verifyErrorMessage(expectedText: string) {
    const msg = this.frame.locator("div.outputmsg_text");
    await expect(msg).toBeVisible({ timeout: 10000 });
    await expect(msg).toHaveText(expectedText);
  }

  async verifyUserInList(userName: string, fullName: string, email: string) {
    const cells = this.page
      .frameLocator('iframe[name="gsft_main"]')
      .locator('td.vt[adp_encrypted="false"][ng-non-bindable]');
    await expect(cells.filter({ hasText: userName })).toBeVisible();
    await expect(cells.filter({ hasText: fullName })).toBeVisible();
    await expect(cells.filter({ hasText: email })).toBeVisible();
  }

  async verifyRoleAssigned(roleName: string) {
    await expect(
      this.frame.locator("a.linked", { hasText: roleName })
    ).toBeVisible();
  }

  async verifyRolesEmpty() {
    const el = this.frame.locator(
      '[id="sys_user.sys_user_has_role.user"] > div.list2_empty-state-list'
    );
    await expect(el).toBeVisible();
    await expect(el).toContainText("No records to display");
  }

  async verifyTitleField(expectedTitle: string) {
    const field = this.frame.locator("#sys_user\\.title");
    await expect(field).toBeVisible({ timeout: 10000 });
    await expect(field).toHaveValue(expectedTitle);
  }

  async verifySearchResultByName(expectedName: string) {
    await expect(
      this.page
        .frameLocator('iframe[name="gsft_main"]')
        .locator('td.vt[adp_encrypted="false"][ng-non-bindable]')
        .nth(1)
    ).toHaveText(expectedName);
  }

  async verifyMultiFilterResults(
    userName: string,
    fullName: string,
    email: string
  ) {
    const cells = this.page
      .frameLocator('iframe[name="gsft_main"]')
      .locator('td.vt[adp_encrypted="false"][ng-non-bindable]');
    await expect(cells.filter({ hasText: userName })).toBeVisible();
    await expect(cells.filter({ hasText: fullName })).toBeVisible();
    await expect(cells.filter({ hasText: email })).toBeVisible();
  }

  async verifyEmptyList() {
    await expect(
      this.frame.locator("div.list2_empty-state-list").first()
    ).toContainText("No records to display");
  }
}