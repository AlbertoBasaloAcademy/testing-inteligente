# Spec: specs/S0004-launch-lifecycle/spec.md

Feature: [US3] See the status of each launch in the list
  As a registered user
  I want to see the status of each launch in the list
  So that I can know the state of all the launches

  Background:
    Given a registered user exists
    And the rocket "Seed Rocket" exists in the fleet
    And the user is logged in

  Scenario: [R8] Show the status of each launch
    Given a launch of "Seed Rocket" has the status "successful"
    When the user opens the page "/launches"
    Then the launch shows the status "successful"

  Scenario: [R9] Show the cause and the message of a suspended launch
    Given a launch of "Seed Rocket" has the status "suspended" with the cause "technical" and the message "Engine leak"
    When the user opens the page "/launches"
    Then the launch shows the status "suspended"
    And the launch shows the cause "technical" and the message "Engine leak"
