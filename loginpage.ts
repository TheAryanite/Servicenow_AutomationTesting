import { Page } from "@playwright/test";
import loginData from "../Data/loginData.json";

export class LoginPage {
  constructor(private page: Page) {}

  private userNameInput = () =>
    this.page.getByRole("textbox", { name: "User name" });
  private passwordInput = () =>
    this.page.getByRole("textbox", { name: "Password" });
  private loginButton = () =>
    this.page.getByRole("button", { name: "Log in" });

  async goto() {
    await this.page.goto(loginData.BaseUrl);
  }

  async login() {
    await this.userNameInput().fill(loginData.UserName);
    await this.passwordInput().fill(loginData.Password);
    await this.loginButton().click();
  }
}