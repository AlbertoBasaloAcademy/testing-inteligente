# Spec: specs/S0002-rocket-fleet/spec.md

Feature: [US3] See the details of a rocket
  As a registered user
  I want to see the details of a rocket
  So that I can know its capacity and range

  Background:
    Given a registered user exists
    And the rocket "Falcon" exists

  Scenario Outline: [R2] Reject a request without a valid token
    Given the user has <token>
    When the user requests the rocket "Falcon"
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |

  Scenario: [R8] Show a message for a rocket that does not exist
    Given the user is logged in
    And no rocket has the id "unknown-id"
    When the user opens the page "/rockets/unknown-id"
    Then the system shows a "not found" message
