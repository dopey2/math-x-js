import { isNumber, isOperator } from "./utils";


const findNextNumberIndex = (symbols: string[], startIndex = 0) => {
    let nextNumberIndex = -1;

    for(let i = startIndex; i < symbols.length && nextNumberIndex === -1; i++) {
        if(isNumber(symbols[i])) {
            nextNumberIndex = i;
        }
    }

    return nextNumberIndex;
};


/**
 * Surround with bracket negative numbers
 * If at the beginning of the expression ex: "-2 +3" becomes "{-2} + 3"
 * If after operator ex:  "2 * -3" becomes "2 * {-3}"
 * Except in front of parenthesis
 * @param {string[]} arr An array of symbols
 */
export const normalizeNegativeNumbers = (arr: string[]) => {
    let symbols = [...arr];

    for(let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const lastSymbol = symbols[i - 1];
        const nextSymbol = symbols[i + 1];

        if(symbol === '-') {
            if(
                (!lastSymbol || isOperator(lastSymbol))
                && !(nextSymbol && (nextSymbol === "("))
            ) {
                const left = symbols.slice(0, i);

                const NEXT_NUMBER_INDEX = findNextNumberIndex(symbols, i);

                let mid = symbols.slice(i + 1, NEXT_NUMBER_INDEX + 1);
                mid = normalizeNegativeNumbers(mid);

                if(mid.length === 2 && mid[0] === "-" && isNumber(mid[1])) {
                    mid = [mid.join("")];
                }
                
                const right = symbols.slice(NEXT_NUMBER_INDEX + 1, symbols.length);

                symbols = [...left, '{' , '-', ...mid, '}', ...right];
            }
        }
    }

    return symbols;
};

/**
 * Given the following expression
 *  1 + 2 / 3 + 4
 *  It should return 1 + {2} / {3} + 4
 * @param expression
 */
const normalizeFractions = (symbols: string[]) => {
    // Todo implement this
    return symbols;
};

/**
 * Given the following expression
 *  1 + 2 ^ 3 + 4
 *  It should return 1 + 2 ^ {3} + 4
 * @param expression
 */
const normalizeExponent = (symbols: string[]) => {
    // Todo implement this
    return symbols;
};

export const normalize = (symbols: string[]) => {
    return normalizeExponent(normalizeFractions(normalizeNegativeNumbers(symbols)));
};
