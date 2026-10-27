// Page Object of the rockets page (specs/S0002-rocket-fleet/US2-list-rockets.feature).
import type { Locator, Page } from "@playwright/test";

export class RocketsPage {
  readonly rocketList: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.rocketList = page.getByRole("list", { name: "Rockets" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/rockets");
  }

  // The link of the rocket list that shows the name.
  rocketLink(name: string): Locator {
    return this.rocketList.getByRole("link", { name });
  }
}
