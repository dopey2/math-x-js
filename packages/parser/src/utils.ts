export const isNumber = (n: string) => !isNaN(Number(n));

export const isOperator = (c: string) => {
    return ["+", "-", "*", ":", "/", "^"].indexOf(c) !== -1;
};

export const isInParenthesis = (symbols: string[]) => {
    const first = symbols[0];
    const last = symbols[symbols.length - 1];

    const HAS_PARENTHESIS = first === "(" && last === ")";

    let numberOfParenthesis = 0;
    let depth = 0;

    for(let i = 0; i < symbols.length && HAS_PARENTHESIS; i++) {
        let char = symbols[i];

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

export const isInBracket = (symbols: string[]) => {
    const first = symbols[0];
    const last = symbols[symbols.length - 1];
    const HAS_BRACKET = first === "{" && last === "}";

    let numberOfBracket = 0;
    let depth = 0;

    for(let i = 0; i < symbols.length && HAS_BRACKET; i++) {
        let char = symbols[i];

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

export const getParenthesisContent = (symbols: string[]) => {
    return symbols.slice(1, symbols.length - 1);
};

export const splitStringExpressionToSymbols = (expression: string) => {
    expression = expression.split("").filter((c)=>c !== " ").join("");
    let symbols: string[] = [];

    for(let i = 0; i < expression.length; i++) {
        const symbolN1 = symbols[symbols.length - 1];
        const char = expression[i];

        if(symbolN1 && isNumber(symbolN1) && isNumber(char)) {
            symbols[symbols.length - 1] = symbolN1 + char;
        } else {
            symbols.push(expression[i]);
        }
    }

    return symbols;
};
