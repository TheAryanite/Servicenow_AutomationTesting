import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  private allMenuItem = () =>
    this.page.getByRole("menuitem", { name: "All" });
  private menuSearchInput = () =>
    this.page.getByRole("textbox", {
      name: "Enter search term to filter all menu",
    });

  async navigateToModule(moduleName: string) {
    await this.allMenuItem().click();
    await this.menuSearchInput().fill(moduleName);
  }
}