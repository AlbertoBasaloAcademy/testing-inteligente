---
id: S0005
name: Passenger Bookings
slug: passenger-bookings
e2e-date: 2026-11-04T17:50:19.950+01:00 
e2e-result: PASS. 80 passed; 0 failed; 0 skipped; 0 flaky. Exit code: 0.
---

# S0005 - Passenger Bookings

## Problem

The agency cannot record passengers on a launch. Operators need to book passengers without duplicate bookings or more bookings than seats.

### User stories

- US1: As an operator, I want to **book a passenger on a launch** so that I can reserve one seat for that passenger.
- US2: As an operator, I want to **see the passengers of a launch and its available seats** so that I can check its bookings.

### Business rules

- An operator must be a registered user. A passenger must not need a user account.
- A passenger must have a name, nationality, identity document, email and phone.
- A passenger must be identified by the identity document only.
- A booking must reserve one seat on one launch.
- A launch must not have more bookings than the capacity of its rocket.
- A passenger must not have more than one booking on the same launch.
- A booking must be created only when the launch status is `planned` or `confirmed`.

### Out of scope

- Payments.
- Passenger accounts and passenger self-service.
- Edit or cancel a booking.
- Edit passenger contact data.
- Seat numbers, waiting lists and passenger notifications.
- New user roles or permissions.
- Automatic changes to bookings when a launch changes status.

## Solution

### Back

- Add `POST /api/launches/:id/bookings` with `name`, `nationality`, `identityDocument`, `email` and `phone`. Return 201 with the booking and its `id`.
- Store each booking with its `launchId` and the five passenger fields. Compare identity documents after removal of leading and trailing spaces. Permit the same document on different launches.
- Add `GET /api/launches/:id/bookings`. Return 200 with the bookings, rocket capacity and available seats. Calculate available seats as capacity minus booking count.
- Require a valid `Authorization: Bearer <token>` for both endpoints. Return 401 if the token is missing or not valid.
- Require all five fields to be non-empty strings after removal of leading and trailing spaces. Check the email format. Return 400 with `error` and `fields` for input errors.
- Return 404 if the launch does not exist. Return 409 for a duplicate booking, a full launch or a status that does not permit bookings.
- Check status, available seats and duplicate documents, and save the booking as one atomic operation. Concurrent requests must not bypass these checks.
- Return errors as `{ "error": "<message>" }`, with `fields` for input errors. Do not expose internal details.
- Put the business rules in `logic`. Prove each rule with unit tests and fake `data`. Verify concurrent booking protection at the persistence boundary.

### Front

- Add a `Passengers` link for each launch in `/launches`. Open `/launches/:id/bookings`.
- Show the bookings with the five passenger fields, rocket capacity and available seats.
- For a `planned` or `confirmed` launch with available seats, show a form with `Name`, `Nationality`, `Identity document`, `Email`, `Phone` and `Book passenger`.
- After a successful booking, clear the form and refresh the list and available seats.
- Show field errors near the related fields. Show other errors above the form and refresh the launch availability after a 409.
- Show a message when the launch is full or its status does not permit bookings.
- Send the user to the login page if the back returns 401.

### E2E

- Put the tests in `e2e/tests/S0005-passenger-bookings/`.
- Log in as the operator. Add required initial launches, rockets and bookings to `e2e/core/seed-data.ts`.
- Keep each test independent. Use unique documents and emails for data created during a test.
- Book passengers on `planned` and `confirmed` launches. Check their contact data and available seats.
- Check missing fields and an email with an invalid format.
- Check duplicate documents, full launches and each status that does not permit bookings.
- Send concurrent requests for the last seat and concurrent requests with the same document. Check that only one booking is saved.
- Check access without a valid token and requests for a launch that does not exist.

## Verification

- [ ] R1 (US1): When an operator sends valid passenger data for a launch with an available seat and status `planned` or `confirmed`, the system shall save one booking with all five fields and return 201.
- [ ] R2 (US1): If a booking request has no valid token, then the system shall return 401 and save no booking.
- [ ] R3 (US1): If a required field is missing or invalid, then the system shall return 400 with the related fields and save no booking.
- [ ] R4 (US1): If the launch does not exist, then the system shall return 404 and save no booking.
- [ ] R5 (US1): If the identity document already has a booking on the launch, then the system shall return 409 and save no additional booking, including for concurrent requests.
- [ ] R6 (US1): If the launch has no available seats, then the system shall return 409 and save no booking, including when concurrent requests compete for the last seat.
- [ ] R7 (US1): If the launch status is `successful`, `suspended` or `failed`, then the system shall return 409 and save no booking.
- [ ] R8 (US2): When an operator opens the passenger page of an existing launch, the system shall show its bookings with all five passenger fields, rocket capacity and available seats.
- [ ] R9 (US2): If a user opens the passenger page without a valid token, then the system shall send the user to the login page.
