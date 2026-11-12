---
id: S0006
name: User Roles
slug: user-roles
---

# S0006 - User Roles

## Problem

Every user with a session can do every action. The agency needs an operator who manages the service and a passenger who only consults it.

### User stories

- US1: As a visitor, I want to **register as a passenger** so that I can consult rockets, launches and free seats.
- US2: As a signed-in user, I want the **menu to show my name and my role** so that I see only the actions of that role.
- US3: As the agency, I want an **operator created at startup** so that an operator can manage rockets, launches and bookings.

### Business rules

- A user must have one role: `operator` or `passenger`.
- A registration must create a user with the role `passenger`.
- A passenger must be able to list rockets, read one rocket, list launches and read the free seats of a launch.
- A passenger must not create or change a rocket, a launch or a booking, and must not read the passengers of a launch.
- An operator must be able to manage rockets, launches and bookings.
- The back must create one operator at startup when no operator exists, and must not create a second operator later.
- The operator email and password must come from the environment, and the default values must apply when `NODE_ENV` is not `production`.

### Out of scope

- A booking made by a passenger.
- Assign a role, or change a role.
- A role other than `operator` and `passenger`.
- E2E proof of the startup rules. Unit tests prove them.

### Affected specs

This rule changes who can use these specs. They say "a registered user", or that a passenger has no account.

- S0002 - Rocket Fleet: only an operator adds a rocket. A passenger can list the rockets and open a rocket.
- S0003 - Schedule Launch: only an operator schedules a launch. A passenger can list the launches.
- S0004 - Launch Lifecycle: only an operator changes the status. A passenger can see the status in the list.
- S0005 - Passenger Bookings: only an operator books a passenger and sees the passengers. A passenger can see the free seats and must not see passenger data.

## Solution

### Back

- Store the role `operator` or `passenger`. `POST /api/auth/register` sets `passenger`.
- At startup, create the operator when none exists. Store the password as a salted hash. The name is `Operator`.
- Read `OPERATOR_EMAIL` and `OPERATOR_PASSWORD`. When `NODE_ENV` is not `production`, a missing value uses `operator@example.com` or `operator-password`. An unset `NODE_ENV` uses the defaults. When `NODE_ENV` is `production`, a missing value stops the startup.
- A request without a valid token returns 401. Check the token before the role.
- A passenger `POST` or `PATCH` on `/api/rockets` or `/api/launches`, or `POST /api/launches/:id/bookings`, returns 403 and changes nothing.
- `GET /api/launches/:id/bookings` returns 403 for a passenger. An operator still receives 200.
- Add `GET /api/launches/:id/availability`. Return 200 with `capacity` and `availableSeats` and no passenger fields, or 404 if the launch does not exist. A passenger and an operator can call it.
- `GET /api/rockets`, `GET /api/rockets/:id` and `GET /api/launches` stay available to both roles.
- Prove the startup rules with unit tests and a fake `data`.

### Front

- The menu shows the name and the role, for example `Ana (passenger)` or `Operator (operator)`.
- A passenger sees Rockets and Launches, and the free seats of each launch.
- A passenger does not see `Add rocket`, `Schedule launch`, `Confirm`, `Success`, `Fail`, `Suspend`, `Passengers` or `Book passenger`.
- An operator sees those actions.
- A 401 sends the user to the login page. A 403 shows an error and no passenger data.

### E2E

- Put the tests in `e2e/tests/S0006-user-roles/`.
- Register a passenger with a unique email from `Date.now()`.
- Log in as that passenger. Check `Name (passenger)`, the hidden actions, and the rockets, launches and free seats.
- Log in as the operator from the default environment values. Check `Operator (operator)` and the management actions.
- Do not cover startup, a missing variable or `NODE_ENV=production`.

## Verification

- [ ] R1 (US1): When a visitor sends a valid registration, the system shall create a user with the role `passenger`.
- [ ] R2 (US1): When a passenger requests the rockets, one rocket, the launches or the free seats of a launch, the system shall return 200 and shall not return passenger data.
- [ ] R3 (US1): If a passenger creates a rocket, schedules a launch, changes a launch status or books a passenger, then the system shall return 403 and shall not change the data.
- [ ] R4 (US1): If a passenger requests the passengers of a launch, then the system shall return 403.
- [ ] R5 (US1): If a request to rockets, launches or bookings has no valid token, then the system shall return 401.
- [ ] R6 (US2): When a passenger has a session, the system shall show the name and the role in the menu, for example `Ana (passenger)`, and shall hide `Add rocket`, `Schedule launch`, `Confirm`, `Success`, `Fail`, `Suspend`, `Passengers` and `Book passenger`.
- [ ] R7 (US2): When an operator has a session, the system shall show the name and the role `operator` in the menu and shall show the actions to add a rocket, schedule a launch, change a launch status and book a passenger.
- [ ] R8 (US3): When the back starts, no operator exists, and the operator email and password are set or `NODE_ENV` is not `production`, the system shall create one operator, store the password as a salted hash, and use `OPERATOR_EMAIL` and `OPERATOR_PASSWORD`, or the defaults `operator@example.com` and `operator-password` when a variable is missing.
- [ ] R9 (US3): If `NODE_ENV` is `production` and `OPERATOR_EMAIL` or `OPERATOR_PASSWORD` is missing, then the system shall not start.
