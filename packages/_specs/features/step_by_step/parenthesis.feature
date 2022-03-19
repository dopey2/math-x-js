Feature: Step by step fractions
  Check step by step solution for the following expressions

  Scenario: Expression "2 * (3 + 4)"
    Given the expression "2 * (3 + 4)"
    When all steps are solved
    Then step 0 should be "2 * (3 + 4)"
    Then step 1 should be "2 * 7"
    Then step 2 should be "14"
    Then step 2 should be atomic

  Scenario: Expression "10 - (2 * 3)"
    Given the expression "10 - (2 * 3)"
    When all steps are solved
    Then step 0 should be "10 - (2 * 3)"
    Then step 1 should be "10 - 6"
    Then step 2 should be "4"
    Then step 2 should be atomic

  Scenario: Expression "10 - (2 * 3)"
    Given the expression "10 - (2 * 3)"
    When all steps are solved
    Then step 0 should be "10 - (2 * 3)"
    Then step 1 should be "10 - 6"
    Then step 2 should be "4"
    Then step 2 should be atomic

  Scenario: Expression "-10 - (2 * 3)"
    Given the expression "-10 - (2 * 3)"
    When all steps are solved
    Then step 0 should be "-10 - (2 * 3)"
    Then step 1 should be "-10 - 6"
    Then step 2 should be "-16"
    Then step 2 should be atomic

  Scenario: Expression "-10 - (2 * 3) + 5"
    Given the expression "-10 - (2 * 3) + 5"
    When all steps are solved
    Then step 0 should be "-10 - (2 * 3) + 5"
    Then step 1 should be "-10 - 6 + 5"
    Then step 2 should be "-16 + 5"
    Then step 3 should be "-11"
    Then step 3 should be atomic

  Scenario: Expression "(2 + 3) * (4 + 5)"
    Given the expression "(2 + 3) * (4 + 5)"
    When all steps are solved
    Then step 0 should be "(2 + 3) * (4 + 5)"
    Then step 1 should be "5 * 9"
    Then step 2 should be "45"
    Then step 2 should be atomic

  Scenario: Expression "(2 * 3) + (4 * 5)"
    Given the expression "(2 * 3) + (4 * 5)"
    When all steps are solved
    Then step 0 should be "(2 * 3) + (4 * 5)"
    Then step 1 should be "6 + 20"
    Then step 2 should be "26"
    Then step 2 should be atomic

  Scenario: Expression "(2 * 3) - (4 * 5)"
    Given the expression "(2 * 3) - (4 * 5)"
    When all steps are solved
    Then step 0 should be "(2 * 3) - (4 * 5)"
    Then step 1 should be "6 - 20"
    Then step 2 should be "-14"
    Then step 2 should be atomic

  Scenario: Expression "(3 + (2 * 3)) * 2"
    Given the expression "(3 + (2 * 3)) * 2"
    When all steps are solved
    Then step 0 should be "(3 + (2 * 3)) * 2"
    Then step 1 should be "(3 + 6) * 2"
    Then step 2 should be "9 * 2"
    Then step 3 should be "18"
    Then step 3 should be atomic

  Scenario: Expression "(3 + (2 * 3)) * 2 + 2"
    Given the expression "(3 + (2 * 3)) * 2 + 2"
    When all steps are solved
    Then step 0 should be "(3 + (2 * 3)) * 2 + 2"
    Then step 1 should be "(3 + 6) * 2 + 2"
    Then step 2 should be "9 * 2 + 2"
    Then step 3 should be "18 + 2"
    Then step 4 should be "20"
    Then step 4 should be atomic

  Scenario: Expression "(3 + (2 * 3)) * 2 - (4 + 5)"
    Given the expression "(3 + (2 * 3)) * 2 - (4 + 5)"
    When all steps are solved
    Then step 0 should be "(3 + (2 * 3)) * 2 - (4 + 5)"
    Then step 1 should be "(3 + 6) * 2 - 9"
    Then step 2 should be "9 * 2 - 9"
    Then step 3 should be "18 - 9"
    Then step 4 should be "9"
    Then step 4 should be atomic

  Scenario: Expression "(3 + (2 * 3)) * 2 - (4 + 5) * 2"
    Given the expression "(3 + (2 * 3)) * 2 - (4 + 5) * 2"
    When all steps are solved
    Then step 0 should be "(3 + (2 * 3)) * 2 - (4 + 5) * 2"
    Then step 1 should be "(3 + 6) * 2 - 9 * 2"
    Then step 2 should be "9 * 2 - 18"
    Then step 3 should be "18 - 18"
    Then step 4 should be "0"
    Then step 4 should be atomic

  Scenario: Expression "(1 + 1)"
    Given the expression "(1 + 1)"
    When all steps are solved
    Then step 0 should be "(1 + 1)"
    Then step 1 should be "2"
    Then step 1 should be atomic

  Scenario: Expression "(1 + 1) * (2 + 2) + (3 + 3)"
    Given the expression "(1 + 1) * (2 + 2) + (3 + 3)"
    When all steps are solved
    Then step 0 should be "(1 + 1) * (2 + 2) + (3 + 3)"
    Then step 1 should be "2 * 4 + 6"
    Then step 2 should be "8 + 6"
    Then step 3 should be "14"
    Then step 3 should be atomic

