# Spec: specs/S0006-user-roles/spec.md

Feature: [US2] Show the name and the role in the menu
  As a signed-in user
  I want the menu to show my name and my role
  So that I see only the actions of that role

  Background:
    Given the user has a session

  Scenario: [R6] Show the passenger name and hide management actions
    Given the user is a passenger named "Ana"
    When the passenger opens the menu
    Then the menu shows "Ana (passenger)"
    And the menu hides "Add rocket", "Schedule launch", "Confirm", "Success", "Fail", "Suspend", "Passengers" and "Book passenger"

  Scenario: [R7] Show the operator role and the management actions
    Given the user is the operator
    When the operator opens the menu
    Then the menu shows "Operator (operator)"
    And the menu shows "Add rocket", "Schedule launch", "Confirm", "Success", "Fail", "Suspend", "Passengers" and "Book passenger"
