# Spec: specs/S0004-launch-lifecycle/spec.md

Feature: [US1] Change the status of a launch
  As a registered user
  I want to change the status of a launch
  So that I can follow the launch to its end

  Background:
    Given a registered user exists
    And the rocket "Seed Rocket" exists in the fleet
    And the user is logged in

  Scenario: [R1] Give a new launch the status planned
    When the user schedules a launch of "Seed Rocket" for a unique future date
    Then the launch has the status "planned"

  Scenario Outline: [R2] Change the status to a permitted new status
    Given a launch of "Seed Rocket" has the status "<current>"
    When the user sends the status "<next>" for the launch
    Then the system returns 200
    And the launch has the status "<next>"

    Examples:
      | current   | next       |
      | planned   | confirmed  |
      | confirmed | successful |
      | confirmed | failed     |

  Scenario Outline: [R3] Reject a change of status that is not permitted
    Given a launch of "Seed Rocket" has the status "<current>"
    When the user sends the status "<next>" for the launch
    Then the system returns 409
    And the launch has the status "<current>"

    Examples:
      | current    | next       |
      | planned    | successful |
      | planned    | failed     |
      | successful | failed     |
      | failed     | confirmed  |

  Scenario: [R4] Reject a change of status of a launch that does not exist
    Given no launch has the id "unknown-launch"
    When the user sends the status "confirmed" for the launch id "unknown-launch"
    Then the system returns 404
