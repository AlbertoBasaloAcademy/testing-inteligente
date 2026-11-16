# Journey: J0001 · Specs: S0006, S0002
@journey @J0001
Feature: [J0001] Add a rocket
  As an operator
  I want to add a rocket
  So that the fleet has the rocket

  Scenario: Add a rocket
    When the operator signs in # S0006-R7
    And the operator adds a rocket # S0002-R1
    Then the fleet shows the rocket # S0002-R1
