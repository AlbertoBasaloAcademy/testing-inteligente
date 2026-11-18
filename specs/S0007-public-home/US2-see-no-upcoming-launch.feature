# Spec: specs/S0007-public-home/spec.md

Feature: [US2] See a message when there is no upcoming launch
  As a visitor
  I want to see a message when there is no upcoming launch
  So that I know there is nothing to book

  Background:
    Given the visitor has no session

  Scenario: [R6] Do not show the empty message when the seed launch exists
    Given the seed rocket has one upcoming launch
    When the visitor opens "/"
    Then the system does not show "No upcoming launches."
