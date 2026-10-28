// Page Object of the launches page (specs/S0003-schedule-launch/*.feature,
// specs/S0004-launch-lifecycle/*.feature).
import type { Locator, Page, Request, Response } from "@playwright/test";

export type LaunchForm = { rocketName: string; date: string; price: string };
export type Suspension = { suspensionCause: string; suspensionMessage: string };

// The button of each permitted next status, except "suspended".
const STATUS_BUTTONS: Record<string, string> = {
  confirmed: "Confirm",
  successful: "Success",
  failed: "Fail",
};

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

  // The status of the launch on the date, for example "planned".
  statusOf(date: string, status: string): Locator {
    return this.launchOn(date).getByText(status, { exact: true });
  }

  causeSelect(date: string): Locator {
    return this.launchOn(date).getByLabel("Cause");
  }

  messageInput(date: string): Locator {
    return this.launchOn(date).getByLabel("Message");
  }

  suspendLaunchButton(date: string): Locator {
    return this.launchOn(date).getByRole("button", { name: "Suspend launch" });
  }

  // The warning of the browser on the field "Message". Empty if the field is valid.
  async messageWarning(date: string): Promise<string> {
    return this.messageInput(date).evaluate(
      (input) => (input as HTMLInputElement).validationMessage,
    );
  }

  // Records each request that changes the status of a launch.
  watchStatusChanges(): Request[] {
    const requests: Request[] = [];
    this.page.on("request", (request) => {
      if (this.isStatusChange(request)) requests.push(request);
    });
    return requests;
  }

  // Clicks the button of the new status and returns the response of the back.
  async changeStatus(date: string, status: string): Promise<Response> {
    const name = STATUS_BUTTONS[status];
    const response = this.waitForStatusChange();
    await this.launchOn(date).getByRole("button", { name, exact: true }).click();
    return response;
  }

  // Opens the suspension form of the launch and fills the cause and the message.
  async fillSuspension(date: string, suspension: Suspension): Promise<void> {
    await this.launchOn(date).getByRole("button", { name: "Suspend", exact: true }).click();
    await this.causeSelect(date).selectOption(suspension.suspensionCause);
    await this.messageInput(date).fill(suspension.suspensionMessage);
  }

  // Sends the suspension form and returns the response of the back.
  async suspendLaunch(date: string, suspension: Suspension): Promise<Response> {
    await this.fillSuspension(date, suspension);
    const response = this.waitForStatusChange();
    await this.suspendLaunchButton(date).click();
    return response;
  }

  private isStatusChange(request: Request): boolean {
    return request.method() === "PATCH" && request.url().includes("/api/launches/");
  }

  private waitForStatusChange(): Promise<Response> {
    return this.page.waitForResponse((item) => this.isStatusChange(item.request()));
  }
}
