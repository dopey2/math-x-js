Feature: Step by step base operations
  Check step by step solution for the following expressions


  Scenario: Expression "1 + 1"
    Given the expression "1 + 1"
    When all steps are solved
    Then step 0 should be "1 + 1"
    Then step 1 should be "2"
    Then step 1 should be atomic

  Scenario: Expression "2 - 1"
    Given the expression "2 - 1"
    When all steps are solved
    Then step 0 should be "2 - 1"
    Then step 1 should be "1"
    Then step 1 should be atomic

  Scenario: Expression "2 * 2"
    Given the expression "2 * 2"
    When all steps are solved
    Then step 0 should be "2 * 2"
    Then step 1 should be "4"
    Then step 1 should be atomic

  Scenario: Expression "4 : 2"
    Given the expression "4 : 2"
    When all steps are solved
    Then step 0 should be "4 : 2"
    Then step 1 should be "2"
    Then step 1 should be atomic

  Scenario: Expression "1 + 2 * 3"
    Given the expression "1 + 2 * 3"
    When all steps are solved
    Then step 0 should be "1 + 2 * 3"
    Then step 1 should be "1 + 6"
    Then step 2 should be "7"
    Then step 2 should be atomic

  Scenario: Expression "1 + 4 : 2"
    Given the expression "1 + 4 : 2"
    When all steps are solved
    Then step 0 should be "1 + 4 : 2"
    Then step 1 should be "1 + 2"
    Then step 2 should be "3"
    Then step 2 should be atomic
