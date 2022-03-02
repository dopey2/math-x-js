import {
    Add,
    Constant,
    Divide,
    Exponent,
    Fraction,
    MathNode,
    Multiply,
    Negative,
    Parenthesis,
    Subtract
} from "@math-x-ts/core/src";

import { normalize } from "./normalisation";
import {
    getParenthesisContent,
    isInBracket,
    isInParenthesis,
    isNumber,
    isOperator,
    splitStringExpressionToSymbols
} from "./utils";


const getOperatorPriority = (operator: string) => {
    if(operator === "+" || operator === "-") {
        return 1;
    } if(operator === "*" || operator === ":") {
        return 2;
    } if(operator === "^" || operator === "/") {
        return 3;
    }
    return 0;
};

const parseParenthesisAndBracket = (symbols: string[]) => {
    if(!symbols.length) {
        return new Constant(NaN);
    }
    
    if(isInParenthesis(symbols)) {
        const content = getParenthesisContent(symbols);
        return new Parenthesis(buildMathNode(content));
    }
    
    if(isInBracket(symbols)) {
        const content = getParenthesisContent(symbols);
        return buildMathNode(content);
    }

    return buildMathNode(symbols);
};

/**
 * Find the last operator with the lowest priority and return its index.
 *
 * - The function read each character from left to right;
 * - The function ignore parenthesis and bracket since they're parsed elsewhere;
 * - The function ignore negative numbers;
 *
 * Ex. ["2", "+", "6", "-", "3", "*" "2"]
 * The last lowest priority operator is "-" so the function will return 3
 *
 * @param {string[]} symbols a list of symbols
 * @return {number} the index of the operator with the lowest priority
 */
const findLastLowestPriorityOperator = (symbols: string[]) => {
    let lowestPriority = 3;
    let lastLowestPriorityIndex = -1;

    let depth = 0;

    for(let i = 0; i < symbols.length; i++) {
        const char = symbols[i];

        if(char === "(" || char === "{") {
            depth++;
        }
        if(char === ")" || char === "}") {
            depth--;
        }

        /**
         * Ignore the operators in the parenthesis since they are parsed later
         */
        if(depth > 0) {
            continue;
        }

        if(isOperator(char)) {
            const OPERATOR_PRIORITY = getOperatorPriority(char);
            if(OPERATOR_PRIORITY <= lowestPriority) {
                lowestPriority = OPERATOR_PRIORITY;
                lastLowestPriorityIndex = i;
            }
        }
    }

    return lastLowestPriorityIndex;
};


const buildMathNode: (symbols: string[]) => MathNode = (symbols: string[]) => {
    if(symbols.length === 1 && isNumber(symbols[0])) {
        return new Constant(parseFloat(symbols[0]));
    }

    // todo try to normalize this case -2 inside (-2) should be a single symbol
    if(symbols.length === 2 && symbols[0] === '-' && isNumber(symbols[1])) {
        return new Constant(parseFloat(`-${symbols[1]}`));
    }


    if(isInParenthesis(symbols) || isInBracket(symbols)) {
        return parseParenthesisAndBracket(symbols);
    }

    const OPERATOR_INDEX = findLastLowestPriorityOperator(symbols);

    const operator = symbols[OPERATOR_INDEX];
    const leftString = symbols.slice(0, OPERATOR_INDEX);
    const rightString = symbols.slice(OPERATOR_INDEX + 1, symbols.length);

    const left = parseParenthesisAndBracket(leftString);
    const right = parseParenthesisAndBracket(rightString);

    return mathNodeFactory(operator, left, right) as MathNode;
};

/**
 * Parse a given mathematical expression and return a MathNode.
 *
 * Eg: parse("2 + 3 * 4") will produce the following object:
 *
 * new Add(new Constant(2), new Multiply(new Constant(3), new Constant(4))
 *
 * @see MathNode
 *
 * @param {string} expression A mathematical expression
 * @return {MathNode} a math node that represent the expression from the input
 */
export const parse: (expression: string) => MathNode = (expression: string) => {
    const symbols = splitStringExpressionToSymbols(expression);
    const normalized = normalize(symbols);
    return buildMathNode(normalized);
};

const mathNodeFactory = (operator: string, left: MathNode, right: MathNode) => {

    // when left is NaN
    if(left.value !== left.value) {
        if(operator === "-") {
            return new Negative(right);
        }
    }

    if(operator === "+") {
        return new Add(left, right);
    } else if(operator === "-") {
        return new Subtract(left, right);
    } else if(operator === "*") {
        return new Multiply(left, right);
    } else if (operator === ":") {
        return new Divide(left, right);
    } else if(operator === "/") {
        return new Fraction(left, right);
    } else if(operator === "^") {
        return new Exponent(left, right);
    }

    // other edge case
    return new Constant(NaN);
};
