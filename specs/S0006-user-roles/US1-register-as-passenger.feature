# Spec: specs/S0006-user-roles/spec.md

Feature: [US1] Register as a passenger
  As a visitor
  I want to register as a passenger
  So that I can consult rockets, launches and free seats

  Background:
    Given the visitor has no account

  Scenario: [R1] Register a visitor as a passenger
    When the visitor sends a valid registration
    Then the system creates a user with the role "passenger"

  Scenario Outline: [R2] Return rockets, launches and free seats to a passenger
    Given a passenger has a valid token
    When the passenger requests <resource>
    Then the system returns 200
    And the response has no passenger data

    Examples:
      | resource                   |
      | the rockets                |
      | one rocket                 |
      | the launches               |
      | the free seats of a launch |

  Scenario Outline: [R3] Reject a change by a passenger
    Given a passenger has a valid token
    And the current data is known
    When the passenger <action>
    Then the system returns 403
    And the system does not change the data

    Examples:
      | action                  |
      | creates a rocket        |
      | schedules a launch      |
      | changes a launch status |
      | books a passenger       |

  Scenario: [R4] Reject a passenger request for the passengers of a launch
    Given a passenger has a valid token
    And a launch exists
    When the passenger requests the passengers of the launch
    Then the system returns 403

  Scenario Outline: [R5] Reject a request without a valid token
    Given the request has <token>
    When the visitor sends a request to <resource>
    Then the system returns 401

    Examples:
      | resource | token             |
      | rockets  | no token          |
      | rockets  | a token not valid |
      | launches | no token          |
      | launches | a token not valid |
      | bookings | no token          |
      | bookings | a token not valid |
