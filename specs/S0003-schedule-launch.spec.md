---
id: S0003
name: Schedule Launch
slug: schedule-launch
---

# S0003 - Schedule Launch

## Problem

The agency cannot plan launches for the rockets of its fleet. Users cannot set a launch date or a price for each passenger.

### User stories

- US1: As a registered user, I want to **schedule a launch of a rocket** so that I can offer a trip on a future date.
- US2: As a registered user, I want to **list the launches** so that I can see the planned trips.

### Business rules

- A user must be registered to schedule or list launches.
- A launch must use a rocket that exists in the fleet of S0002.
- A launch must have a date after the current date.
- A launch must have a price per passenger greater than 0.
- A launch must not have the same date as another launch of the same rocket.

### Out of scope

- Edit or cancel a launch.
- Book seats on a launch.
- Launch times, durations and launch sites.
- Currencies other than one default currency.

## Solution

### Back

- Add the resource `/api/launches`.
- `POST /api/launches` takes `rocketId`, `date` (ISO 8601 `YYYY-MM-DD`) and `pricePerPassenger`. It returns 201 with the launch and its `id`.
- `GET /api/launches` returns 200 with the list of launches. Each launch has the rocket `name`.
- Check the `Authorization: Bearer <token>` header. Return 401 if the token is missing or not valid.
- Check each input field. Return 400 with `{ "error", "fields" }` if a field is not valid.
- Return 400 with the field `rocketId` if the rocket does not exist.
- Return 409 if the rocket has a launch on the same date.
- Put the rules in `logic`. Prove each rule with a unit test and a fake `data`.

### Front

- Add the page `/launches` with the list of launches and a form to schedule a launch.
- The form has the fields `Rocket` (a list of the fleet rockets), `Date` and `Price per passenger`, and the button `Schedule launch`.
- Each list item shows the date, the rocket name and the price per passenger.
- Show the error message from the back near the related field.
- Send the user to the login page if the back returns 401.

### E2E

- Put the tests in `e2e/tests/schedule-launch.spec.ts`.
- Log in as a seed user from `e2e/core/seed-data.ts`.
- Add the seed rocket `Seed Rocket` (capacity 5, range `orbital`) to `e2e/core/seed-data.ts`.
- Make each date unique: calculate a future date from `Date.now()`.
- Schedule a launch and find it in the list.
- Schedule 2 launches of the same rocket on the same date and check the error.
- Schedule a launch with a past date and check the error.
- Schedule a launch with a price of 0 and check the error.

## Verification

- [ ] R1 (US1) WHEN a registered user sends a valid launch, THE system SHALL create the launch and return 201.
- [ ] R2 (US1) IF the request has no valid token, THEN THE system SHALL return 401.
- [ ] R3 (US1) IF the rocket does not exist, THEN THE system SHALL return 400 with the field `rocketId`.
- [ ] R4 (US1) IF the date is not after the current date, THEN THE system SHALL return 400 with the field `date`.
- [ ] R5 (US1) IF the price per passenger is not greater than 0, THEN THE system SHALL return 400 with the field `pricePerPassenger`.
- [ ] R6 (US1) IF the rocket has a launch on the same date, THEN THE system SHALL return 409.
- [ ] R7 (US2) WHEN a registered user opens `/launches`, THE system SHALL show all the launches with the date, the rocket name and the price per passenger.
- [ ] R8 (US2) IF the request for the list has no valid token, THEN THE system SHALL return 401.
