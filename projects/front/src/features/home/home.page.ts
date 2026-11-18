import { escapeHtml } from "../../shared/html.escape.ts";
import { identity } from "../../shared/identity.ts";
import type { CardRegistration, PageContext } from "../../shared/page.type.ts";
import { readUser } from "../auth/auth.store.ts";
import { loadUpcomingLaunches } from "./home.client.ts";
import type { PublicLaunch } from "./home.type.ts";

const publicName = "AstroBookings";
const publicOffer = "AstroBookings offers seats on upcoming rocket launches.";

function showPublicDocument() {
  document.title = publicName;
  const current = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  const meta = current ?? document.createElement("meta");
  meta.name = "description";
  meta.content = publicOffer;
  if (!current) document.head.append(meta);
}
function showCurrentDocument() {
  document.title = identity.name;
  document.querySelector('meta[name="description"]')?.remove();
}
function launchText(launch: PublicLaunch) {
  const values = [launch.rocketName, launch.date, String(launch.pricePerPassenger), launch.status];
  return values.map((value) => `<span>${escapeHtml(value)}</span>`).join(" ");
}
function upcomingBlock(launches: readonly PublicLaunch[]) {
  if (launches.length === 0) return "<p>No upcoming launches.</p>";
  const items = launches.map((launch) => `<li>${launchText(launch)}</li>`).join("");
  return `<ul>${items}</ul>`;
}
async function mountPublicHome(context: PageContext) {
  showPublicDocument();
  const launches = await loadUpcomingLaunches(context.services.http);
  const template = document.createElement("template");
  template.innerHTML = `<header><h1>${escapeHtml(publicName)}</h1><p>${escapeHtml(publicOffer)}</p></header>${upcomingBlock(launches)}<p><a href="/register">Register</a></p>`;
  context.outlet.append(template.content.cloneNode(true));
}
async function mountCurrentHome(context: PageContext, cards: readonly CardRegistration[]) {
  showCurrentDocument();
  const template = document.createElement("template");
  template.innerHTML = `<header id="home-header"><h1>${escapeHtml(identity.name)}</h1><p>${escapeHtml(identity.description)}</p><p>Version <span id="application-version">${escapeHtml(identity.version)}</span></p></header><section class="card-grid" aria-label="Application cards"></section>`;
  context.outlet.append(template.content.cloneNode(true));
  const grid = context.outlet.querySelector<HTMLElement>(".card-grid");
  if (!grid) throw new Error("Home template is incomplete");
  for (const registration of cards) {
    const card = await registration.load();
    await card.mount({ ...context, outlet: grid });
  }
}
export function createHomePage(cards: readonly CardRegistration[]) {
  return {
    async mount(context: PageContext) {
      if (readUser()) {
        await mountCurrentHome(context, cards);
        return;
      }
      await mountPublicHome(context);
    },
  };
}
