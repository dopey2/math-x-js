Feature: Step by step
  Check step by step solution for the following expressions


  Scenario: Expression "-5"
    Given the expression "-5"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-5"
    And step 0 should be atomic

  Scenario: Expression "--5"
    Given the expression "--5"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-5)"
    Then step 1 should be "5"
    And step 1 should be atomic

  Scenario: Expression "---5"
    Given the expression "---5"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(-5))"
    Then step 1 should be "-(5)"
    Then step 2 should be "-5"
    And step 2 should be atomic

  Scenario: Expression "-(-(-(-(5))))"
    Given the expression "-(-(-(-(5))))"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(-(-(5))))"
    Then step 1 should be "-(-(-(-5)))"
    Then step 2 should be "-(-(5))"
    Then step 3 should be "-(-5)"
    Then step 4 should be "5"

  Scenario: Expression "-(-(-(-(-5))))"
    Given the expression "-(-(-(-(-5))))"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(-(-(-5))))"
    Then step 1 should be "-(-(-(5)))"
    Then step 2 should be "-(-(-5))"
    Then step 3 should be "-(5)"
    Then step 4 should be "-5"

  Scenario: Expression "3 + -2"
    Given the expression "3 + -2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 + (-2)"
    Then step 1 should be "3 - 2"
    Then step 2 should be "1"

# TODO Fix this
  Scenario: Expression "3 - -2"
    Given the expression "3 - -2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 - (-2)"
    Then step 1 should be "3 + 2"
    Then step 2 should be "5"

# TODO Fix this
  Scenario: Expression "3 * -2"
    Given the expression "3 * -2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "3 * (-2)"
    Then step 1 should be "-6"

# TODO Fix this
  Scenario: Expression "4 : -2"
    Given the expression "4 : -2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "4 : (-2)"
    Then step 1 should be "-2"

  Scenario: Expression "-(2 + 3)"
    Given the expression "-(2 + 3)"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(2 + 3)"
    Then step 1 should be "-(5)"
    Then step 2 should be "-5"

  Scenario: Expression "-(-(3 + 3))"
    Given the expression "-(-(3 + 3))"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(3 + 3))"
    Then step 1 should be "-(-(6))"
    Then step 2 should be "-(-6)"
    Then step 3 should be "6"

  Scenario: Expression "-(-(-5 + 3))"
    Given the expression "-(-(-5 + 3))"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(-5 + 3))"
    Then step 1 should be "-(-(-2))"
    Then step 2 should be "-(2)"
    Then step 3 should be "-2"

  Scenario: Expression "-(-(5 - 9))"
    Given the expression "-(-(5 - 9))"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(-(5 - 9))"
    Then step 1 should be "-(-(-4))"
    Then step 2 should be "-(4)"
    Then step 3 should be "-4"

  Scenario: Expression "-(12 + 3) - (12 - 7)"
    Given the expression "-(12 + 3) - (12 - 7)"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-(12 + 3) - (12 - 7)"
    Then step 1 should be "-(15) - 5"
    Then step 2 should be "-15 - 5"
    Then step 3 should be "-20"
    
  Scenario: Expression "{-5}"
    Given the expression "{-5}"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then step 0 should be "-5"
    And step 0 should be atomic

  Scenario: Expression "{-{-5}}"
    Given the expression "{-{-5}}"
    When the expression is parsed
    Then step 0 should be "--5"
    Then step 1 should be "5"
    And step 1 should be atomic

  Scenario: Expression "{-{-{-5}}}"
    Given the expression "{-{-{-5}}}"
    When the expression is parsed
    Then step 0 should be "---5"
    Then step 1 should be "-5"
    And step 1 should be atomic
