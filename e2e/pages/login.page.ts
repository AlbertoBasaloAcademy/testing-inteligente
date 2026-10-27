// Page Object of the login page.
import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly heading: Locator;
  readonly loginButton: Locator;
  readonly loggedInMessage: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByLabel("Password");
    this.heading = page.getByRole("heading", { name: "Login" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loggedInMessage = page.getByText("Logged in");
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  // Opens the page and sends the credentials.
  async logIn(credentials: { email: string; password: string }): Promise<void> {
    await this.goto();
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }
}
