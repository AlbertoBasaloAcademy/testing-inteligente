---
id: S0004
name: Launch Lifecycle
slug: launch-lifecycle
---

# S0004 - Launch Lifecycle

## Problem

A launch has no status after it is scheduled. Users cannot follow a launch to its end, or record why a launch is suspended.

### User stories

- US1: As a registered user, I want to **change the status of a launch** so that I can follow the launch to its end.
- US2: As a registered user, I want to **suspend a launch with a cause and a message** so that other users know why it stopped.
- US3: As a registered user, I want to **see the status of each launch in the list** so that I can know the state of all the launches.

### Business rules

- A user must be registered to change the status of a launch.
- A launch must have one status: `planned`, `confirmed`, `successful`, `suspended` or `failed`.
- A new launch must start with the status `planned`.
- A launch must change status only from `planned` to `confirmed` or `suspended`, from `confirmed` to `successful`, `suspended` or `failed`.
- A launch with the status `successful`, `suspended` or `failed` must not change status.
- A suspended launch must have a cause of `weather`, `technical` or `economic`, and a message with 3 to 200 characters.

### Out of scope

- Reactivate a suspended launch.
- Edit or delete a launch, or change its date or price.
- A history of the status changes.
- Notify passengers or other users.

## Solution

### Back

- Add the field `status` to a launch. A launch without a status has the status `planned`.
- Add the fields `suspensionCause` and `suspensionMessage` to a launch. They are empty if the launch is not suspended.
- `PATCH /api/launches/:id` changes the status with `status`, and `suspensionCause` and `suspensionMessage` for `suspended`. It returns 200 with the launch.
- Return 404 if the launch does not exist.
- Return 409 if the change of status is not permitted.
- Check each input field. Return 400 with `{ "error", "fields" }` if a field is not valid.
- `GET /api/launches` returns the status, and the cause and the message of a suspended launch.
- Put the rules in `logic`. Prove each rule with a unit test and a fake `data`.

### Front

- In the list of `/launches`, show the status of each launch.
- For a suspended launch, show the cause and the message.
- For each launch, show one button for each permitted next status: `Confirm`, `Success`, `Fail` and `Suspend`.
- `Suspend` opens a form with the fields `Cause` (a list of the 3 causes) and `Message`, and the button `Suspend launch`.
- Show the error message from the back near the related field, or above the list for a 404 or a 409.
- Send the user to the login page if the back returns 401.

### E2E

- Put the tests in `e2e/tests/S0004-launch-lifecycle/`.
- Use the seed user and the seed rocket from `e2e/core/seed-data.ts`.
- Schedule a launch with a unique future date from `Date.now()`.
- Confirm the launch, mark it successful and check the status in the list.
- Suspend a launch with a cause and a message, and check them in the list.
- Suspend a launch without a message and check the error.

## Verification

- [ ] R1 (US1): When a registered user schedules a launch, the system shall give it the status `planned`.
- [ ] R2 (US1): When a registered user sends a permitted new status, the system shall change the status and return 200.
- [ ] R3 (US1): If the change of status is not permitted, then the system shall return 409.
- [ ] R4 (US1): If the launch does not exist, then the system shall return 404.
- [ ] R5 (US2): When a registered user suspends a launch with a valid cause and message, the system shall keep the cause and the message.
- [ ] R6 (US2): If the cause is not `weather`, `technical` or `economic`, then the system shall return 400 with the field `suspensionCause`.
- [ ] R7 (US2): If the message has less than 3 or more than 200 characters, then the system shall return 400 with the field `suspensionMessage`.
- [ ] R8 (US3): When a registered user opens `/launches`, the system shall show the status of each launch.
- [ ] R9 (US3): While a launch is suspended, the system shall show its cause and its message in the list.
