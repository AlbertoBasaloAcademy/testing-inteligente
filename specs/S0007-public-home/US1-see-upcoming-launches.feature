# Spec: specs/S0007-public-home/spec.md

Feature: [US1] See the upcoming launches
  As a visitor
  I want to see what AstroBookings is, the upcoming launches and a link to register
  So that I can decide whether to book a seat

  Background:
    Given the visitor has no session
    And the seed rocket has one upcoming launch

  Scenario: [R1] Show the offer, the launch and the register link
    When the visitor opens "/"
    Then the system shows "AstroBookings"
    And the system shows "AstroBookings offers seats on upcoming rocket launches."
    And the system shows that launch with its rocket name, date, price per passenger and status only
    And the system shows a "Register" link to "/register"

  Scenario: [R2] Return the public upcoming launches
    When the visitor requests the upcoming launches
    Then the system returns 200
    And the list has only the launches whose date is after the current date and whose status is "planned" or "confirmed"
    And the list is ordered by date ascending and then by rocket name ascending

  Scenario: [R3] Set the title, the description, one heading and the language
    When the visitor opens "/"
    Then the document title is "AstroBookings"
    And the meta description is "AstroBookings offers seats on upcoming rocket launches."
    And the page has one "h1"
    And the "html" element has the language "en"

  Scenario: [R4] Meet WCAG 2.1 A and AA
    When the visitor opens "/"
    Then the page has no WCAG 2.1 A or AA violation

  Scenario: [R5] Keep the LCP and the CLS within the local limits
    When the visitor opens "/" in the local environment
    Then the Largest Contentful Paint is under 2.5 seconds
    And the Cumulative Layout Shift is under 0.1
