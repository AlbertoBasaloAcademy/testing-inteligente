# Keywords must be in English: Feature, Background, Scenario, Given, When, Then, And

Feature: {Title of the User Story 1}
  As a {Type of User}
  I want to {Perform an Action}
  So that {Achieve a Business Value / Goal}

Background:
  Given the system is in {controlled state}
  And {any other necessary preconditions}

  Scenario: [R1] {Short name for EARS Criterion 1}
    Given {Prerequisites or Context}
    When {Trigger / Event from EARS}
    Then {Expected System Response}

  Scenario: [R2] {Short name for EARS Criterion 2}
    Given {Prerequisites}
    When {Specific Condition happens}
    Then {System action occurs}

  Scenario: [R3] {Short name for EARS Criterion 3}
    Given the user is on the target page
    When the user inputs "<input_data>"
    Then the system displays "<expected_result>"

    Examples:
      | input_data | expected_result |
      | value_1    | outcome_A       |
      | value_2    | outcome_B       |
