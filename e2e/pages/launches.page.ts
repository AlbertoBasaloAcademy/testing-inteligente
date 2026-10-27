// Page Object of the launches page (specs/S0003-schedule-launch/*.feature).
import type { Locator, Page, Response } from "@playwright/test";

export type LaunchForm = { rocketName: string; date: string; price: string };

export class LaunchesPage {
  readonly rocketSelect: Locator;
  readonly dateInput: Locator;
  readonly priceInput: Locator;
  readonly scheduleButton: Locator;
  readonly launchList: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.rocketSelect = page.getByLabel("Rocket");
    this.dateInput = page.getByLabel("Date");
    this.priceInput = page.getByLabel("Price per passenger");
    this.scheduleButton = page.getByRole("button", { name: "Schedule launch" });
    this.launchList = page.getByRole("list", { name: "Launches" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/launches");
  }

  // The item of the launch list that shows the date.
  launchOn(date: string): Locator {
    return this.launchList.getByRole("listitem").filter({ hasText: date });
  }

  // A visible text on the page, for example a confirmation.
  message(text: string): Locator {
    return this.page.getByText(text);
  }

  // A status region (role "status") that shows the text, for example an error.
  status(text: string): Locator {
    return this.page.getByRole("status").filter({ hasText: text });
  }

  async fillForm(launch: LaunchForm): Promise<void> {
    await this.rocketSelect.selectOption({ label: launch.rocketName });
    await this.dateInput.fill(launch.date);
    await this.priceInput.fill(launch.price);
  }

  // Opens the page, sends the form and returns the response of the back.
  async scheduleLaunch(launch: LaunchForm): Promise<Response> {
    await this.goto();
    await this.fillForm(launch);
    const response = this.page.waitForResponse(
      (item) => item.url().endsWith("/api/launches") && item.request().method() === "POST",
    );
    await this.scheduleButton.click();
    return response;
  }
}
