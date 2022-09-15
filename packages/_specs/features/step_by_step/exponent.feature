Feature: Step by step exponent
  Check step by step solution for the following expressions


  Scenario: Expression "3 ^ 2"
    Given the expression "3 ^ 2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 ^ {2}"
    Then step 1 should be "9"
    Then step 1 should be atomic

  Scenario: Expression "3 ^ 0"
    Given the expression "3 ^ 0"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 ^ {0}"
    Then step 1 should be "1"
    Then step 1 should be atomic

  Scenario: Expression "3 ^ {2}"
    Given the expression "3 ^ {2}"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 ^ {2}"
    Then step 1 should be "9"
    Then step 1 should be atomic

  Scenario: Expression "2 ^ {2 + 2}"
    Given the expression "2 ^ {2 + 2}"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "2 ^ {2 + 2}"
    Then step 1 should be "2 ^ {4}"
    Then step 2 should be "16"
    Then step 2 should be atomic

  Scenario: Expression "4 * 3 ^ 2"
    Given the expression "4 * 3 ^ 2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "4 * 3 ^ {2}"
    Then step 1 should be "4 * 9"
    Then step 2 should be "36"
    Then step 2 should be atomic

  Scenario: Expression "(4 * 3) ^ 2"
    Given the expression "(4 * 3) ^ 2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "(4 * 3) ^ {2}"
    Then step 1 should be "12 ^ {2}"
    Then step 2 should be "144"
    Then step 2 should be atomic

  Scenario: Expression "(4 * 3)^ 2"
    Given the expression "(1 + 3) ^ 2 * 3"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "(1 + 3) ^ {2} * 3"
    Then step 1 should be "4 ^ {2} * 3"
    Then step 2 should be "16 * 3"
    Then step 3 should be "48"
    Then step 3 should be atomic

  Scenario: Expression "(1 + 3) ^ {2 * 3}"
    Given the expression "(1 + 3) ^ {2 * 3}"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "(1 + 3) ^ {2 * 3}"
    Then step 1 should be "4 ^ {6}"
    Then step 2 should be "4096"
    Then step 2 should be atomic