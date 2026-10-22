# Spec: specs/S0003-schedule-launch.spec.md

Feature: Schedule a launch of a rocket
  As a registered user
  I want to schedule a launch of a rocket
  So that I can offer a trip on a future date

  Background:
    Given a registered user exists
    And the rocket "Seed Rocket" exists in the fleet

  Scenario: [R1] Schedule a valid launch
    Given the user is logged in
    When the user schedules a launch of "Seed Rocket" on a future date with a price per passenger greater than 0
    Then the system creates the launch
    And the system returns 201

  Scenario Outline: [R2] Reject a launch without a valid token
    Given the user has <token>
    When the user schedules a launch of "Seed Rocket" on a future date with a price per passenger greater than 0
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |

  Scenario: [R3] Reject a launch of a rocket that does not exist
    Given the user is logged in
    When the user schedules a launch of a rocket that is not in the fleet
    Then the system returns 400
    And the error has the field "rocketId"

  Scenario Outline: [R4] Reject a launch with a date that is not after the current date
    Given the user is logged in
    When the user schedules a launch of "Seed Rocket" on <date>
    Then the system returns 400
    And the error has the field "date"

    Examples:
      | date             |
      | the current date |
      | a past date      |

  Scenario: [R5] Reject a launch with a price per passenger of 0
    Given the user is logged in
    When the user schedules a launch of "Seed Rocket" with a price per passenger of 0
    Then the system returns 400
    And the error has the field "pricePerPassenger"

  Scenario: [R6] Reject a second launch of the same rocket on the same date
    Given the user is logged in
    And "Seed Rocket" has a launch on a future date
    When the user schedules a launch of "Seed Rocket" on the same date
    Then the system returns 409
