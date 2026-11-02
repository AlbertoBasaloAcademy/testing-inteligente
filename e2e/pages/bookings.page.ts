// Page Object of the passenger page (specs/S0005-passenger-bookings/*.feature).
import type { Locator, Page } from "@playwright/test";
import type { Passenger } from "../core/bookings";

export class BookingsPage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly nationalityInput: Locator;
  readonly identityDocumentInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly bookButton: Locator;
  readonly error: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Passengers" });
    this.nameInput = page.getByLabel("Name");
    this.nationalityInput = page.getByLabel("Nationality");
    this.identityDocumentInput = page.getByLabel("Identity document");
    this.emailInput = page.getByLabel("Email");
    this.phoneInput = page.getByLabel("Phone");
    this.bookButton = page.getByRole("button", { name: "Book passenger" });
    this.error = page.getByRole("alert");
  }

  async goto(launchId: string): Promise<void> {
    await this.page.goto(`/launches/${encodeURIComponent(launchId)}/passengers`);
  }

  passenger(name: string): Locator {
    return this.page.getByRole("listitem").filter({ hasText: name });
  }

  availability(capacity: number, seats: number): Locator {
    return this.page.getByText(`Rocket capacity: ${capacity} · Available seats: ${seats}`, {
      exact: true,
    });
  }

  async fillPassenger(passenger: Passenger): Promise<void> {
    await this.nameInput.fill(passenger.name);
    await this.nationalityInput.fill(passenger.nationality);
    await this.identityDocumentInput.fill(passenger.identityDocument);
    await this.emailInput.fill(passenger.email);
    await this.phoneInput.fill(passenger.phone);
  }

  async bookPassenger(passenger: Passenger): Promise<void> {
    await this.fillPassenger(passenger);
    await this.bookButton.click();
  }
}
