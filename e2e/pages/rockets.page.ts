// Page Object of the rockets page (specs/S0002-rocket-fleet/*.feature).
import type { Locator, Page } from "@playwright/test";

export type RocketForm = { name: string; capacity: number; range: string };

export class RocketsPage {
  readonly nameInput: Locator;
  readonly capacityInput: Locator;
  readonly rangeSelect: Locator;
  readonly addButton: Locator;
  readonly rocketList: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel("Name");
    this.capacityInput = page.getByLabel("Capacity");
    this.rangeSelect = page.getByLabel("Range");
    this.addButton = page.getByRole("button", { name: "Add rocket" });
    this.rocketList = page.getByRole("list", { name: "Rockets" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/rockets");
  }

  // The link of the rocket list that shows the name.
  rocketLink(name: string): Locator {
    return this.rocketList.getByRole("link", { name });
  }

  // Opens the page and adds the rocket through the form.
  async addRocket(rocket: RocketForm): Promise<void> {
    await this.goto();
    await this.nameInput.fill(rocket.name);
    await this.capacityInput.fill(String(rocket.capacity));
    await this.rangeSelect.selectOption(rocket.range);
    await this.addButton.click();
  }
}
