---
id: S0007
name: Public Home
slug: public-home
---

# S0007 - Public Home

## Problem

A visitor with no session cannot see what AstroBookings offers. The visitor cannot see the upcoming launches or a way to register.

### User stories

- US1: As a visitor, I want to **see what AstroBookings is, the upcoming launches and a link to register** so that I can decide whether to book a seat.
- US2: As a visitor, I want to **see a message when there is no upcoming launch** so that I know there is nothing to book.
- US3: As a signed-in user, I want to **see the home page as it is today** so that I keep the current start of the application.

### Business rules

- A visitor must be able to read the upcoming launches with no session.
- An upcoming launch must have a date after the current date and the status `planned` or `confirmed`.
- The upcoming launches must be ordered by date, earliest first, and by rocket name when the date is the same.
- The public data of a launch must be the rocket name, the date, the price per passenger and the status.
- The public data must not include the launch id, the rocket id, the creation time, a suspension cause, a suspension message or passenger data.
- A visitor must see the message `No upcoming launches.` when the list is empty.
- A user with a session must see the current home: the application name, the description, the version and the application cards.

### Out of scope

- The page `/about` and the other public pages.
- The production server.
- Measures from real users.
- Book a seat from the home page.
- Change `GET /api/launches` for a user with a session.
- E2E proof of the date, the status, the order or the empty list. The seed has one upcoming launch. Unit tests of the back prove the date, the status and the order.

## Solution

### Back

- Add `GET /api/launches/upcoming`. It needs no token. It returns 200 with the public upcoming launches.
- Keep a launch when its date is after the current date and its status is `planned` or `confirmed`.
- Order the list by date ascending, then by rocket name ascending.
- Each item has `rocketName`, `date`, `pricePerPassenger` and `status` only.
- Return 200 and an empty list when there is no upcoming launch.
- Do not return 401 for this endpoint. Leave `GET /api/launches` unchanged.
- Put the date, status and order rules in `logic`. Prove each rule with a unit test and a fake `data`.

### Front

- With no session, `/` shows the name `AstroBookings`, the text `AstroBookings offers seats on upcoming rocket launches.`, the upcoming launches and a `Register` link to `/register`.
- Show the rocket name, the date, the price per passenger and the status of each launch.
- When the list is empty, show `No upcoming launches.`
- Set the document title to `AstroBookings`. Set a meta description with the same text. Use one `h1`, the name `AstroBookings`. Set `lang="en"` on `html`.
- With a session, `/` stays as it is today: the application name, the description, the version and the application cards. Do not show the upcoming launches.

### E2E

- Put the tests in `e2e/tests/S0007-public-home/`.
- Add one launch to `e2e/core/seed-data.ts`. Use the seed rocket. The status is `planned`, the date is seven days after the current date and the price per passenger is 100.
- Open `/` with no session. Check the description, the public data of that launch and the `Register` link.
- On that page, check the title `AstroBookings`, the meta description, one `h1` and `lang="en"` on `html`.
- On that page, check no WCAG 2.1 A or AA violation, an LCP under 2.5 s and a CLS under 0.1. The run is local.
- Log in and open `/`. Check the version and the application cards, and that the upcoming launches are absent.
- Do not add launches for the date, the status, the order or the empty list.

## Verification

- [ ] R1 (US1): When a visitor with no session opens `/`, the system shall show `AstroBookings`, the text `AstroBookings offers seats on upcoming rocket launches.`, each upcoming launch with its rocket name, date, price per passenger and status only, and a `Register` link to `/register`.
- [ ] R2 (US1): When a visitor requests the upcoming launches with no session, the system shall return 200 with only the launches whose date is after the current date and whose status is `planned` or `confirmed`, ordered by date ascending and then by rocket name ascending.
- [ ] R3 (US1): When a visitor with no session opens `/`, the system shall set the title `AstroBookings`, the meta description `AstroBookings offers seats on upcoming rocket launches.`, one `h1` and the language `en` on the `html` element.
- [ ] R4 (US1): When a visitor with no session opens `/`, the system shall have no WCAG 2.1 A or AA violation.
- [ ] R5 (US1): When a visitor with no session opens `/` in the local environment, the system shall keep the Largest Contentful Paint under 2.5 seconds and the Cumulative Layout Shift under 0.1.
- [ ] R6 (US2): When a visitor with no session opens `/` and the seed rocket has one upcoming launch, the system shall not show `No upcoming launches.`.
- [ ] R7 (US3): When a user with a session opens `/`, the system shall show the application name, the description, the version and the application cards, and shall not show the upcoming launches.
