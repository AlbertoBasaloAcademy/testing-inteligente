# Spec: specs/S0003-schedule-launch.spec.md

Feature: List the launches
  As a registered user
  I want to list the launches
  So that I can see the planned trips

  Background:
    Given a registered user exists
    And the rocket "Seed Rocket" has a scheduled launch

  Scenario: [R7] Show all the launches
    Given the user is logged in
    When the user opens the page "/launches"
    Then the system shows each launch
    And each launch shows the date, the rocket name and the price per passenger

  Scenario Outline: [R8] Reject a request for the list without a valid token
    Given the user has <token>
    When the user requests the list of launches
    Then the system returns 401

    Examples:
      | token             |
      | no token          |
      | a token not valid |
