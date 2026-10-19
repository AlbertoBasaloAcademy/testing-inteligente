---
id: S0002
name: Rocket Fleet
slug: rocket-fleet
---

# S0002 - Rocket Fleet

## Problem

The agency has no record of its rockets. Users cannot add a rocket or see the rockets of the fleet.

### User stories

- As a registered user, I want to **add a rocket** so that I can grow the fleet.
- As a registered user, I want to **list the rockets** so that I can see the full fleet.
- As a registered user, I want to **see the details of a rocket** so that I can know its capacity and range.

### Business rules

- A user must be registered to add, list or see rockets.
- A rocket must have a name with 3 to 40 characters.
- A rocket name must be unique in the fleet.
- A rocket must have a capacity of 1 to 10 passengers.
- A rocket must have a range of `suborbital`, `orbital`, `moon` or `mars`.

### Out of scope

- Edit a rocket.
- Delete a rocket.
- Roles and permissions other than a registered user.

## Solution

### Back

- Add the resource `/api/rockets`.
- `POST /api/rockets` creates a rocket. It returns 201 with the rocket and its `id`.
- `GET /api/rockets` returns 200 with the list of rockets.
- `GET /api/rockets/:id` returns 200 with the rocket, or 404 if it does not exist.
- Check the `Authorization: Bearer <token>` header. Return 401 if the token is missing or not valid.
- Check each input field. Return 400 with `{ "error", "fields" }` if a field is not valid.
- Return 409 if the name exists already.
- Put the rules in `logic` and prove each rule with a unit test and a fake `data`.

### Front

- Add the page `/rockets` with the list of rockets and a form to add a rocket.
- The form has the fields `Name`, `Capacity` and `Range`, and the button `Add rocket`.
- Show the error message from the back near the related field.
- Add the list item as a link to the page `/rockets/:id`.
- Add the page `/rockets/:id` that shows the name, capacity and range of the rocket.
- Send the user to the login page if the back returns 401.

### E2E

- Put the tests in `e2e/tests/rocket-fleet.spec.ts`.
- Log in as a seed user from `e2e/core/seed-data.ts`.
- Use a unique rocket name with `Date.now()`.
- Add a rocket and find it in the list.
- Open the rocket and check its details.
- Add a rocket with a name that exists and check the error.
- Add a rocket with a capacity that is not valid and check the error.

## Verification

- [ ] WHEN a registered user sends a valid rocket, THE system SHALL create the rocket and return 201.
- [ ] WHEN a user sends a request without a valid token, THE system SHALL return 401.
- [ ] IF the rocket name has less than 3 or more than 40 characters, THEN THE system SHALL return 400 with the field `name`.
- [ ] IF the rocket name exists already, THEN THE system SHALL return 409.
- [ ] IF the capacity is not between 1 and 10, THEN THE system SHALL return 400 with the field `capacity`.
- [ ] IF the range is not a permitted value, THEN THE system SHALL return 400 with the field `range`.
- [ ] WHEN a registered user opens `/rockets`, THE system SHALL show all the rockets of the fleet.
- [ ] WHEN a registered user opens `/rockets/:id` of a rocket that does not exist, THE system SHALL show a "not found" message.
