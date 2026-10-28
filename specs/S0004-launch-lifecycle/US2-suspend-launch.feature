# Spec: specs/S0004-launch-lifecycle/spec.md

Feature: [US2] Suspend a launch with a cause and a message
  As a registered user
  I want to suspend a launch with a cause and a message
  So that other users know why it stopped

  Background:
    Given a registered user exists
    And the rocket "Seed Rocket" exists in the fleet
    And the user is logged in
    And a launch of "Seed Rocket" has the status "planned"

  Scenario: [R5] Suspend a launch with a valid cause and message
    When the user suspends the launch with the cause "weather" and the message "Strong wind"
    Then the system returns 200
    And the launch has the status "suspended"
    And the launch has the cause "weather" and the message "Strong wind"

  Scenario Outline: [R6] Reject a cause that is not valid
    When the user suspends the launch with the cause "<cause>" and the message "Strong wind"
    Then the system returns 400
    And the error has the field "suspensionCause"

    Examples:
      | cause |
      | storm |
      |       |

  Scenario Outline: [R7] Reject a message with a length that is not valid
    When the user suspends the launch with the cause "weather" and a message of <length> characters
    Then the system returns 400
    And the error has the field "suspensionMessage"

    Examples:
      | length |
      | 2      |
      | 201    |

  Scenario: [R7] Stop a suspension without a message
    When the user suspends the launch with the cause "weather" and no message
    Then the browser shows a warning on the field "Message"
    And the system does not send the suspension
