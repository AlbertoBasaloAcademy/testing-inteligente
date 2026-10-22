# Spec: specs/S0003-schedule-launch.spec.md

Feature: Schedule a launch
  As a registered user
  I want to schedule a launch of a rocket
  So that I can offer seats on a future date

  Background:
    Given a registered user exists
    And the rocket "Falcon" exists in the fleet

  Scenario: [R1] Schedule a valid launch
    Given the user is logged in
    And the rocket "Falcon" has no launch tomorrow
    When the user sends a launch of "Falcon" for tomorrow with a price of 100
    Then the system creates the launch
    And the system returns 201

  Scenario Outline: [R2] Reject a request without a valid token
    Given the user has <token>
    When the user sends a launch of "Falcon" for tomorrow with a price of 100
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |

  Scenario: [R3] Reject a rocket that is not in the fleet
    Given the user is logged in
    And no rocket in the fleet has the id "unknown-rocket"
    When the user sends a launch of the rocket id "unknown-rocket" for tomorrow with a price of 100
    Then the system returns 400
    And the error has the field "rocketId"

  Scenario Outline: [R4] Reject a date that is not valid or not in the future
    Given the user is logged in
    When the user sends a launch of "Falcon" for the date "<date>" with a price of 100
    Then the system returns 400
    And the error has the field "date"

    Examples:
      | date       |
      | 2026/12/01 |
      | 2026-13-45 |
      | today      |
      | yesterday  |

  Scenario Outline: [R5] Reject a price that is not a number greater than 0
    Given the user is logged in
    When the user sends a launch of "Falcon" for tomorrow with a price of <price>
    Then the system returns 400
    And the error has the field "pricePerPassenger"

    Examples:
      | price |
      | 0     |
      | -10   |
      | "abc" |

  Scenario: [R6] Reject a second launch of a rocket on the same date
    Given the user is logged in
    And the rocket "Falcon" has a launch tomorrow
    When the user sends a launch of "Falcon" for tomorrow with a price of 100
    Then the system returns 409
