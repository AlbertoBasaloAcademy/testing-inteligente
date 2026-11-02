# Spec: specs/S0005-passenger-bookings/spec.md

Feature: [US1] Book a passenger on a launch
  As an operator
  I want to book a passenger on a launch
  So that I can reserve one seat for that passenger

  Background:
    Given a registered operator exists

  Scenario Outline: [R1] Book a passenger
    Given the operator has a valid token
    And a launch has status "<status>" and an available seat
    And the passenger has no booking on the launch
    When the operator sends a booking request with valid passenger data
    Then the system returns 201
    And the system saves one booking with the supplied name, nationality, identity document, email and phone

    Examples:
      | status    |
      | planned   |
      | confirmed |

  Scenario Outline: [R2] Reject a booking without a valid token
    Given a planned launch has an available seat
    And the request has "<token>"
    When the operator sends a booking request with valid passenger data
    Then the system returns 401
    And the system saves no booking

    Examples:
      | token            |
      | no token         |
      | an invalid token |

  Scenario Outline: [R3] Reject invalid passenger data
    Given the operator has a valid token
    And a planned launch has an available seat
    And all passenger fields except "<field>" contain valid data
    When the operator sends a booking request with "<input>" for "<field>"
    Then the system returns 400
    And the response contains an error and identifies "<field>" in fields
    And the system saves no booking

    Examples:
      | field            | input           |
      | name             | a missing field |
      | nationality      | a missing field |
      | identityDocument | a missing field |
      | email            | a missing field |
      | phone            | a missing field |
      | name             | an empty string |
      | nationality      | an empty string |
      | identityDocument | an empty string |
      | email            | an empty string |
      | phone            | an empty string |
      | name             | spaces only     |
      | nationality      | spaces only     |
      | identityDocument | spaces only     |
      | email            | spaces only     |
      | phone            | spaces only     |
      | name             | a number        |
      | nationality      | a number        |
      | identityDocument | a number        |
      | email            | a number        |
      | phone            | a number        |
      | email            | invalid-email   |

  Scenario: [R4] Reject a booking for a launch that does not exist
    Given the operator has a valid token
    And the requested launch does not exist
    When the operator sends a booking request with valid passenger data
    Then the system returns 404
    And the system saves no booking

  Scenario Outline: [R5] Reject duplicate bookings
    Given the operator has a valid token
    And a planned launch has at least two available seats
    And the passenger has "<existing>" bookings on the launch
    When the operator sends "<requests>" with valid passenger data
    And the requests use "<documents>"
    Then the system returns "<responses>"
    And the launch has exactly one booking for that identity document

    Examples:
      | existing | requests                        | documents                                              | responses           |
      | 1        | one booking request             | the existing document                                  | 409                 |
      | 1        | one booking request             | the existing document with leading and trailing spaces | 409                 |
      | 0        | two concurrent booking requests | the same document                                      | one 201 and one 409 |

  Scenario Outline: [R6] Enforce rocket capacity
    Given the operator has a valid token
    And a planned launch has "<seats>" available seats
    When the operator sends "<requests>" with valid passenger data
    And each request uses a different identity document
    Then the system returns "<responses>"
    And the system saves "<saved>" new bookings
    And the launch has zero available seats
    And the booking count equals the rocket capacity

    Examples:
      | seats | requests                        | responses           | saved |
      | 0     | one booking request             | 409                 | 0     |
      | 1     | two concurrent booking requests | one 201 and one 409 | 1     |

  Scenario Outline: [R7] Reject bookings for a closed launch
    Given the operator has a valid token
    And a launch has status "<status>" and an available seat
    When the operator sends a booking request with valid passenger data
    Then the system returns 409
    And the system saves no booking

    Examples:
      | status     |
      | successful |
      | suspended  |
      | failed     |
