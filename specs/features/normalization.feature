Feature: Normalization
  Following expression should be normalized when parsed


  Scenario: Expression "-0"
    Given the expression "-0"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "0"

  Scenario: Expression "-1"
    Given the expression "-1"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "-1"

  Scenario: Expression "--1"
    Given the expression "--1"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "-(-1)"

  Scenario: Expression "---1"
    Given the expression "---1"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "-(-(-1))"

  Scenario: Expression "-0 + 0"
    Given the expression "-0 + 0"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "0 + 0"

  Scenario: Expression "-1 + 1"
    Given the expression "-1 + 1"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "-1 + 1"

  Scenario: Expression "4 / 2"
    Given the expression "4 / 2"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "{4} / {2}"

  Scenario: Expression "3 * 4 / 2 * 4"
    Given the expression "3 * 4 / 2 * 3"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "3 * {4} / {2} * 3"

  Scenario: Expression "2 ^ 3"
    Given the expression "2 ^ 3"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "2 ^ {3}"

  Scenario: Expression "2 ^ 3 * 4"
    Given the expression "2 ^ 3 * 4"
    When the expression is parsed
    Then the parsed expression should be isometric
    Then the string output should be "2 ^ {3} * 4"

