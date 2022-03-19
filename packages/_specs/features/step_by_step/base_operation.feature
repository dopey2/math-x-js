Feature: Step by step base operations
  Check step by step solution for the following expressions

  Scenario: Expression "1 + 1"
    Given the expression "1 + 1"
    When all steps are solved
    Then step 0 should be "1 + 1"
    Then step 1 should be "2"
    Then step 1 should be atomic
