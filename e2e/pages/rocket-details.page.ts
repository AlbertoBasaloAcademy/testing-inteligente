// Page Object of the rocket details page (specs/S0002-rocket-fleet/US3-see-rocket-details.feature).
import type { Locator, Page } from "@playwright/test";

export class RocketDetailsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(id: string): Promise<void> {
    await this.page.goto(`/rockets/${id}`);
  }

  // A status region (role "status") that shows the text, for example an error.
  status(text: string | RegExp): Locator {
    return this.page.getByRole("status").filter({ hasText: text });
  }
}
