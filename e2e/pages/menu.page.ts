// Page Object of the main menu (specs/S0006-user-roles/US2-show-name-and-role.feature).
import type { Locator, Page } from "@playwright/test";

export class MenuPage {
  readonly navigation: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole("navigation", { name: "Main menu" });
  }

  userLabel(label: string): Locator {
    return this.navigation.getByRole("link", { name: label, exact: true });
  }

  action(name: string): Locator {
    const button = this.page.getByRole("button", { name, exact: true });
    const link = this.page.getByRole("link", { name, exact: true });
    return button.or(link);
  }

  actionOn(item: Locator, name: string): Locator {
    const button = item.getByRole("button", { name, exact: true });
    const link = item.getByRole("link", { name, exact: true });
    return button.or(link);
  }
}
