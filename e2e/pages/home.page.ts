// Page Object of the home page (specs/S0007-public-home/*.feature).
import AxeBuilder from "@axe-core/playwright";
import type { APIRequestContext, APIResponse, Locator, Page } from "@playwright/test";
import { backUrl } from "../core/env";

const wcag21Aa = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

export type WebVitals = { lcpMs: number; cls: number };
export type WcagViolation = { id: string; impact: string | null | undefined; help: string };

export class HomePage {
  readonly productName: Locator;
  readonly offer: Locator;
  readonly registerLink: Locator;
  readonly heading: Locator;
  readonly emptyMessage: Locator;
  readonly applicationCards: Locator;
  readonly metaDescription: Locator;
  readonly documentElement: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    const main = page.getByRole("main");
    this.productName = main.getByRole("heading", { level: 1, name: "AstroBookings" });
    this.offer = main.getByText("AstroBookings offers seats on upcoming rocket launches.");
    this.registerLink = main.getByRole("link", { name: "Register" });
    this.heading = main.getByRole("heading", { level: 1 });
    this.emptyMessage = main.getByText("No upcoming launches.", { exact: true });
    this.applicationCards = main.getByRole("region", { name: "Application cards" });
    this.metaDescription = page.locator('meta[name="description"]');
    this.documentElement = page.locator("html");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  text(value: string): Locator {
    return this.page.getByRole("main").getByText(value);
  }

  launch(value: {
    rocketName: string;
    date: string;
    pricePerPassenger: number;
    status: string;
  }): Locator {
    const item = this.page.getByRole("main").getByRole("listitem");
    return item
      .filter({ hasText: value.rocketName })
      .filter({ hasText: value.date })
      .filter({ hasText: String(value.pricePerPassenger) })
      .filter({ hasText: value.status });
  }

  card(name: string): Locator {
    return this.applicationCards.getByRole("heading", { name });
  }

  // Asks the back for the public upcoming launches. The caller sends no token.
  async upcoming(request: APIRequestContext): Promise<APIResponse> {
    return request.get(`${backUrl}/api/launches/upcoming`);
  }

  // WCAG 2.1 A and AA violations on the open page.
  async wcagViolations(): Promise<WcagViolation[]> {
    const results = await new AxeBuilder({ page: this.page }).withTags(wcag21Aa).analyze();
    return results.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
    }));
  }

  // LCP and CLS already recorded by the browser for this page.
  async readVitals(): Promise<WebVitals> {
    return this.page.evaluate(() => {
      function readShift(entry: PerformanceEntry): number {
        const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (shift.hadRecentInput) return 0;
        return shift.value ?? 0;
      }
      return new Promise<WebVitals>((resolve) => {
        const paints: PerformanceEntry[] = [];
        let cls = 0;
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) paints.push(entry);
        });
        const shiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) cls += readShift(entry);
        });
        paintObserver.observe({ type: "largest-contentful-paint", buffered: true });
        shiftObserver.observe({ type: "layout-shift", buffered: true });
        requestAnimationFrame(() => {
          for (const entry of paintObserver.takeRecords()) paints.push(entry);
          for (const entry of shiftObserver.takeRecords()) cls += readShift(entry);
          paintObserver.disconnect();
          shiftObserver.disconnect();
          const last = paints[paints.length - 1];
          resolve({ lcpMs: last ? last.startTime : 0, cls });
        });
      });
    });
  }
}
