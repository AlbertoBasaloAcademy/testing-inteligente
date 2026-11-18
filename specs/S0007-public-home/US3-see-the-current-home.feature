# Spec: specs/S0007-public-home/spec.md

Feature: [US3] See the home page as it is today
  As a signed-in user
  I want to see the home page as it is today
  So that I keep the current start of the application

  Background:
    Given the user has a session

  Scenario: [R7] Show the current home and hide the upcoming launches
    When the user opens "/"
    Then the system shows the application name, the description, the version and the application cards
    And the system does not show the upcoming launches
