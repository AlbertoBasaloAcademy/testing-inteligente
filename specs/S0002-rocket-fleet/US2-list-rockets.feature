# Spec: specs/S0002-rocket-fleet/spec.md

Feature: [US2] List the rockets
  As a registered user
  I want to list the rockets
  So that I can see the full fleet

  Background:
    Given a registered user exists
    And the rockets "Falcon" and "Vega" exist

  Scenario Outline: [R2] Reject a request without a valid token
    Given the user has <token>
    When the user requests the list of rockets
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |

  Scenario: [R7] Show all the rockets of the fleet
    Given the user is logged in
    When the user opens the page "/rockets"
    Then the system shows the rocket "Falcon"
    And the system shows the rocket "Vega"
