import Add from '@math-x-ts/math-node';
import Add from "math-node/Add";
import Multiply from "./math-node/Multiply";
import Constant from "./math-node/Constant";
import MathNode from "./math-node/MathNode";
import Subtract from "./math-node/Subtract";
import Fraction from "./math-node/Fraction";
import Exponent from "./math-node/Exponent";
import Parenthesis from "./math-node/Parenthesis";
import Divide from "./math-node/Divide";


const isNumber = (n: string) => !isNaN(Number(n));

const isInParenthesis = (expression: string) => {
    const exp = expression.trim();
    const first = exp[0];
    const last = exp[exp.length - 1];

    const HAS_PARENTHESIS = first === "(" && last === ")";

    let numberOfParenthesis = 0;
    let depth = 0;
    
    for(let i = 0; i < exp.length && HAS_PARENTHESIS; i++) {
        let char = exp[i];

        if(char === "(") {
            if(depth === 0) {
                numberOfParenthesis++;
            }

            depth++;
        }
        if(char === ")") {
            depth--;
        }
    }

    return numberOfParenthesis === 1;
};

const isInBracket = (expression: string) => {
    const exp = expression.trim();
    const first = exp[0];
    const last = exp[exp.length - 1];
    const HAS_BRACKET = first === "{" && last === "}";

    let numberOfBracket = 0;
    let depth = 0;

    for(let i = 0; i < exp.length && HAS_BRACKET; i++) {
        let char = exp[i];

        if(char === "{") {
            if(depth === 0) {
                numberOfBracket++;
            }

            depth++;
        }
        if(char === "}") {
            depth--;
        }
    }

    return numberOfBracket === 1;
};

const getParenthesisContent = (expression: string) => {
    return expression.slice(1, expression.length - 1);
};

const isOperator = (c: string) => {
    return ["+", "-", "*", ":", "/", "^"].indexOf(c) !== -1;
};

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

const parseParenthesisAndBracket = (exp: string) => {
    if(isInParenthesis(exp)) {
        const content = getParenthesisContent(exp);
        return new Parenthesis(parse(content));
    }
    
    if(isInBracket(exp)) {
        const content = getParenthesisContent(exp);
        return parse(content);
    }

    return parse(exp);
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

        /**
         * Ignore the negative signe which comes from negative numbers ex: Add(-5,3)
         */
        if(char === "-") {
            const prevChar = symbols[i - 1];
            if(prevChar === undefined) {
                continue;
            }
            if(isOperator(prevChar)) {
                continue;
            }
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
    if(isNumber(expression)) {
        return new Constant(parseFloat(expression));
    }
    
    if(isInParenthesis(expression) || isInBracket(expression)) {
        return parseParenthesisAndBracket(expression);
    }

    const symbols = expression.split("").filter((c)=>c !== " ");
    const OPERATOR_INDEX = findLastLowestPriorityOperator(symbols);

    const operator = symbols[OPERATOR_INDEX];
    const leftString = symbols.slice(0, OPERATOR_INDEX).join("");
    const rightString = symbols.slice(OPERATOR_INDEX + 1, symbols.length).join("");

    const left = parseParenthesisAndBracket(leftString);
    const right = parseParenthesisAndBracket(rightString);

    return buildMathNode(operator, left, right);
};

const buildMathNode = (operator: string, left: MathNode, right: MathNode) => {
    if(operator === "+") {
        return new Add(left, right);
    } else if(operator === "-") {
        return new Subtract(left, right);
    } else if(operator === "*") {
        return new Multiply(left, right);
    } else if (operator === ":") {
        return new Divide(left, right);
    }else if(operator === "/") {
        return new Fraction(left, right);
    } else if(operator === "^") {
        return new Exponent(left, right);
    }

    return new Add(new Constant(0), new Constant(0));
};
