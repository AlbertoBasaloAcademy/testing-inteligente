# Spec: specs/S0003-schedule-launch.spec.md

Feature: List the launches
  As a registered user
  I want to list the launches
  So that I can see the planned launches

  Background:
    Given a registered user exists
    And the rocket "Falcon" exists in the fleet
    And the rocket "Falcon" has a launch tomorrow with a price of 100

  Scenario: [R7] Show all the launches with their data
    Given the user is logged in
    When the user opens the page "/launches"
    Then the system shows the launch of "Falcon"
    And the launch shows the rocket name, the date and the price per passenger

  Scenario Outline: [R8] Send a user without a valid token to the login page
    Given the user has <token>
    When the user opens the page "/launches"
    Then the system sends the user to the login page

    Examples:
      | token             |
      | no token          |
      | a token not valid |
