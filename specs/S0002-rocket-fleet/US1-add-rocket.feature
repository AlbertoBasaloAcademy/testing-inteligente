# Spec: specs/S0002-rocket-fleet/spec.md

Feature: [US1] Add a rocket
  As an operator
  I want to add a rocket
  So that I can grow the fleet

  Background:
    Given a registered operator exists

  Scenario: [R1] Add a valid rocket
    Given the operator is logged in
    And no rocket has the name "Falcon"
    When the operator sends the rocket "Falcon" with capacity 5 and range "orbital"
    Then the system creates the rocket
    And the system returns 201

  Scenario Outline: [R2] Reject a request without a valid token
    Given the user has <token>
    When the user sends the rocket "Falcon" with capacity 5 and range "orbital"
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |

  Scenario Outline: [R3, R5, R6] Reject a rocket with a field that is not valid
    Given the operator is logged in
    When the operator sends the rocket "<name>" with capacity <capacity> and range "<range>"
    Then the system returns 400
    And the error has the field "<field>"

    Examples:
      | criterion | name | capacity | range   | field    |
      | R3        | Ab   | 5        | orbital | name     |
      | R3        | AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA | 5        | orbital | name     |
      | R5        | Vega | 0        | orbital | capacity |
      | R5        | Vega | 11       | orbital | capacity |
      | R6        | Vega | 5        | venus   | range    |

  Scenario: [R4] Reject a rocket with a name that exists
    Given the operator is logged in
    And a rocket with the name "Falcon" exists
    When the operator sends the rocket "Falcon" with capacity 5 and range "orbital"
    Then the system returns 409
