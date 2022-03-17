Feature: Step by step fractions
  Check step by step solution for the following fractions

  Scenario: Expression "6 / 3"
    Given the expression "6 / 3"
    When all steps are solved
    Then step 0 should be "{6} / {3}"
    Then step 1 should be "2"

  Scenario: Expression "(3 + 5) / (1 + 1)"
    Given the expression "(3 + 5) / (1 + 1)"
    When all steps are solved
    Then step 0 should be "{(3 + 5)} / {(1 + 1)}"
    Then step 1 should be "{8} / {2}"
    Then step 2 should be "4"

  Scenario: Expression "4 / 2 + 6"
    Given the expression "4 / 2 + 6"
    When all steps are solved
    Then step 0 should be "{4} / {2} + 6"
    Then step 1 should be "2 + 6"
    Then step 2 should be "8"

  Scenario: Expression "4 / 3 + 6"
    Given the expression "4 / 3 + 6"
    When all steps are solved
    Then step 0 should be "{4} / {3} + 6"
    Then step 1 should be "{4} / {3} + {6} / {1}"
    Then step 2 should be "{4} / {3} + {6 * 3} / {1 * 3}"
    Then step 3 should be "{4} / {3} + {18} / {3}"
    Then step 4 should be "{4 + 18} / {3}"
    Then step 5 should be "{22} / {3}"

  Scenario: Expression "4 / 3 + 5 / 3"
    Given the expression "4 / 3 + 5 / 3"
    When all steps are solved
    Then step 0 should be "{4} / {3} + {5} / {3}"
    Then step 1 should be "{4 + 5} / {3}"
    Then step 2 should be "{9} / {3}"
    Then step 3 should be "3"

  Scenario: Expression "8 / 5 + 10 / 6"
    Given the expression "8 / 5 + 10 / 6"
    When all steps are solved
    Then step 0 should be "{8} / {5} + {10} / {6}"
    Then step 1 should be "{8 * 6} / {5 * 6} + {10 * 5} / {6 * 5}"
    Then step 2 should be "{48} / {30} + {50} / {30}"
    Then step 3 should be "{48 + 50} / {30}"
    Then step 4 should be "{98} / {30}"

  Scenario: Expression "8 / 4 + 10 / 6"
    Given the expression "8 / 4 + 10 / 6"
    When all steps are solved
    Then step 0 should be "{8} / {4} + {10} / {6}"
    Then step 1 should be "{8 * 3} / {4 * 3} + {10 * 2} / {6 * 2}"
    Then step 2 should be "{24} / {12} + {20} / {12}"
    Then step 3 should be "{24 + 20} / {12}"
    Then step 4 should be "{44} / {12}"


  Scenario: Expression "10 / {3 + 4} + {8} / 5"
    Given the expression "10 / {3 + 4} + {8} / 5"
    When all steps are solved
    Then step 0 should be "{10} / {3 + 4} + {8} / {5}"
    Then step 1 should be "{10} / {7} + {8} / {5}"
    Then step 2 should be "{10 * 5} / {7 * 5} + {8 * 7} / {5 * 7}"
    Then step 3 should be "{50} / {35} + {56} / {35}"
    Then step 4 should be "{50 + 56} / {35}"
    Then step 5 should be "{106} / {35}"

  Scenario: Expression "4 / 2 - 6"
    Given the expression "4 / 2 - 6"
    When all steps are solved
    Then step 0 should be "{4} / {2} - 6"
    Then step 1 should be "2 - 6"
    Then step 2 should be "-4"

  Scenario: Expression "4 / 3 - 6"
    Given the expression "4 / 3 - 6"
    When all steps are solved
    Then step 0 should be "{4} / {3} - 6"
    Then step 1 should be "{4} / {3} - {6} / {1}"
    Then step 2 should be "{4} / {3} - {6 * 3} / {1 * 3}"
    Then step 3 should be "{4} / {3} - {18} / {3}"
    Then step 4 should be "{4 - 18} / {3}"
    Then step 5 should be "{-14} / {3}"

  Scenario: Expression "4 / 3 - 5 / 3"
    Given the expression "4 / 3 - 5 / 3"
    When all steps are solved
    Then step 0 should be "{4} / {3} - {5} / {3}"
    Then step 1 should be "{4 - 5} / {3}"
    Then step 2 should be "{-1} / {3}"

  Scenario: Expression "8 / 5 - 10 / 6"
    Given the expression "8 / 5 - 10 / 6"
    When all steps are solved
    Then step 0 should be "{8} / {5} - {10} / {6}"
    Then step 1 should be "{8 * 6} / {5 * 6} - {10 * 5} / {6 * 5}"
    Then step 2 should be "{48} / {30} - {50} / {30}"
    Then step 3 should be "{48 - 50} / {30}"
    Then step 4 should be "{-2} / {30}"

  Scenario: Expression "8 / 4 - 10 / 6"
    Given the expression "8 / 4 - 10 / 6"
    When all steps are solved
    Then step 0 should be "{8} / {4} - {10} / {6}"
    Then step 1 should be "{8 * 3} / {4 * 3} - {10 * 2} / {6 * 2}"
    Then step 2 should be "{24} / {12} - {20} / {12}"
    Then step 3 should be "{24 - 20} / {12}"
    Then step 4 should be "{4} / {12}"

  Scenario: Expression "10 / {3 + 4} - {8} / 5"
    Given the expression "10 / {3 + 4} - {8} / 5"
    When all steps are solved
    Then step 0 should be "{10} / {3 + 4} - {8} / {5}"
    Then step 1 should be "{10} / {7} - {8} / {5}"
    Then step 2 should be "{10 * 5} / {7 * 5} - {8 * 7} / {5 * 7}"
    Then step 3 should be "{50} / {35} - {56} / {35}"
    Then step 4 should be "{50 - 56} / {35}"
    Then step 5 should be "{-6} / {35}"

  Scenario: Expression "10 / 5 * 3 / 2"
    Given the expression "10 / 5 * 3 / 2"
    When all steps are solved
    Then step 0 should be "{10} / {5} * {3} / {2}"
    Then step 1 should be "{10 * 3} / {5 * 2}"
    Then step 2 should be "{30} / {10}"
    Then step 3 should be "3"

  Scenario: Expression "10 / 5 * 3"
    Given the expression "10 / 5 * 3"
    When all steps are solved
    Then step 0 should be "{10} / {5} * 3"
    Then step 1 should be "2 * 3"
    Then step 2 should be "6"

  Scenario: Expression "10 / 6 * 2"
    Given the expression "10 / 6 * 2"
    When all steps are solved
    Then step 0 should be "{10} / {6} * 2"
    Then step 1 should be "{10 * 2} / {6 * 2}"
    Then step 2 should be "{20} / {12}"

  Scenario: Expression "{5 + 10} / {2 + 2} + 3"
    Given the expression "{5 + 10} / {2 + 2} + 3"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 2} + 3"
    Then step 1 should be "{15} / {4} + 3"
    Then step 2 should be "{15} / {4} + {3} / {1}"
    Then step 3 should be "{15} / {4} + {3 * 4} / {1 * 4}"
    Then step 4 should be "{15} / {4} + {12} / {4}"
    Then step 5 should be "{15 + 12} / {4}"
    Then step 6 should be "{27} / {4}"

  Scenario: Expression "{5 + 10} / {2 + 3} + 3"
    Given the expression "{5 + 10} / {2 + 3} + 3"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 3} + 3"
    Then step 1 should be "{15} / {5} + 3"
    Then step 2 should be "3 + 3"
    Then step 3 should be "6"

  Scenario: Expression "{5 + 10} / {2 + 3} - 2"
    Given the expression "{5 + 10} / {2 + 3} - 2"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 3} - 2"
    Then step 1 should be "{15} / {5} - 2"
    Then step 2 should be "3 - 2"
    Then step 3 should be "1"

  Scenario: Expression "{5 + 10} / {2 + 3} * 3"
    Given the expression "{5 + 10} / {2 + 3} * 3"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 3} * 3"
    Then step 1 should be "{15} / {5} * 3"
    Then step 2 should be "3 * 3"
    Then step 3 should be "9"

  Scenario: Expression "{5 + 10} / {2 + 4} * 3"
    Given the expression "{5 + 10} / {2 + 4} * 3"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 4} * 3"
    Then step 1 should be "{15} / {6} * 3"
    Then step 2 should be "{15 * 3} / {6 * 3}"
    Then step 3 should be "{45} / {18}"

  Scenario: Expression "{5 + 10} / {2 + 2} : 3"
    Given the expression "{5 + 10} / {2 + 2} : 3"
    When all steps are solved
    Then step 0 should be "{5 + 10} / {2 + 2} : 3"
    Then step 1 should be "{15} / {4} : 3"
    Then step 2 should be "{15} / {4} * {1} / {3}"
    Then step 3 should be "{15 * 1} / {4 * 3}"
    Then step 4 should be "{15} / {12}"