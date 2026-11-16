# Journey: J0001 · Specs: S0006, S0002, S0003, S0004
@journey @J0001
Feature: [J0001] Plan a launch
  As an operator
  I want to add a rocket and schedule a launch with that rocket
  So that passengers can book seats on that launch

  Scenario: Plan a launch with a new rocket
    When the operator signs in # S0006-R7
    And the operator adds a rocket # S0002-R1
    And the operator schedules a launch with that rocket # S0003-R1
    Then the launches list shows the launch # S0003-R7
    And the launch shows the status "planned" # S0004-R1
