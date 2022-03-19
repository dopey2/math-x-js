Feature: Step by step exponent
  Check step by step solution

  Scenario: Expression "3^2"
    Given the expression "3 ^ 2"
    When all steps are solved
    Then step 0 should be "3 ^ {2}"
    Then step 1 should be "9"
    Then step 1 should be atomic
