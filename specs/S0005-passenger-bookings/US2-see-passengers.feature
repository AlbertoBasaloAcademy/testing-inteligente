# Spec: specs/S0005-passenger-bookings/spec.md

Feature: [US2] See the passengers of a launch and its available seats
  As an operator
  I want to see the passengers of a launch and its available seats
  So that I can check its bookings

  Background:
    Given a launch exists

  Scenario: [R8] Show passengers and available seats
    Given the operator has a valid token
    And the rocket capacity is 3
    And the launch has these bookings:
      | name       | nationality | identityDocument | email                  | phone        |
      | Alice Reed | British     | DOC-001          | alice.reed@example.com | +44123456789 |
      | Luis Perez | Spanish     | DOC-002          | luis.perez@example.com | +34612345678 |
    When the operator opens the passenger page of the launch
    Then the page shows both bookings with all five passenger fields
    And the page shows a rocket capacity of 3
    And the page shows 1 available seat

  Scenario Outline: [R9] Send a user without a valid token to login
    Given the user has "<token>"
    When the user opens the passenger page of the launch
    Then the system sends the user to the login page

    Examples:
      | token            |
      | no token         |
      | an invalid token |
