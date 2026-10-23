---
id: S0003
name: Schedule Launch
slug: schedule-launch
---

# S0003 - Schedule Launch

## Problem

The agency cannot plan launches for the rockets of its fleet. Users cannot set a date or a price for a launch.

### User stories

- US1: As a registered user, I want to **schedule a launch of a rocket** so that I can offer seats on a future date.
- US2: As a registered user, I want to **list the launches** so that I can see the planned launches.

### Business rules

- A user must be registered to schedule or list launches.
- A launch must use a rocket of the fleet in S0002 - Rocket Fleet.
- A launch must have a date in the format `YYYY-MM-DD`.
- A launch date must be after the current date.
- A launch must have a price per passenger that is greater than 0.
- A launch must take the full day of its date.
- A rocket must not have two launches on the same date.

### Out of scope

- Add, edit or delete a rocket. S0002 covers the fleet.
- Edit or cancel a launch.
- Launch times, durations and time zones.
- Bookings and seats of passengers.
- Currencies other than one default currency.

## Solution

### Back

- Add the resource `/api/launches`.
- `POST /api/launches` creates a launch with `rocketId`, `date` and `pricePerPassenger`. It returns 201 with the launch, its `id` and the `rocketName`.
- `GET /api/launches` returns 200 with the list of launches.
- Check the `Authorization: Bearer <token>` header. Return 401 if the token is missing or not valid.
- Check each input field. Return 400 with `{ "error", "fields" }` if a field is not valid.
- Return 400 with the field `rocketId` if the rocket is not in the fleet.
- Return 409 if the rocket has a launch on the same date.
- Put the rules in `logic`. Prove each rule with a unit test, a fake `data` and a fixed current date.

### Front

- Add the page `/launches` with the list of launches and a form to schedule a launch.
- The form has the fields `Rocket` (a list of the fleet rockets), `Date` and `Price per passenger`, and the button `Schedule launch`.
- Show the error message from the back near the related field.
- Show the error message from the back above the form for a 409.
- Show the rocket name, the date and the price of each launch in the list.
- Send the user to the login page if the back returns 401.

### E2E

- Put the tests in `e2e/tests/S0003-schedule-launch/`.
- Add a seed user and a seed rocket to `e2e/core/seed-data.ts`.
- Use a unique future date that you calculate from `Date.now()`.
- Schedule a launch of the seed rocket and find it in the list.
- Schedule a second launch of the same rocket on the same date and check the error.
- Schedule a launch with a past date and check the error.

## Verification

- [ ] R1 (US1): When a registered user sends a valid launch, the system shall create the launch and return 201.
- [ ] R2 (US1): If the request has no valid token, then the system shall return 401.
- [ ] R3 (US1): If the rocket is not in the fleet, then the system shall return 400 with the field `rocketId`.
- [ ] R4 (US1): If the date is not a valid date or is not after the current date, then the system shall return 400 with the field `date`.
- [ ] R5 (US1): If the price per passenger is not a number greater than 0, then the system shall return 400 with the field `pricePerPassenger`.
- [ ] R6 (US1): If the rocket has a launch on the same date, then the system shall return 409.
- [ ] R7 (US2): When a registered user opens `/launches`, the system shall show all the launches with the rocket name, the date and the price per passenger.
- [ ] R8 (US2): If the user opens `/launches` without a valid token, then the system shall send the user to the login page.
