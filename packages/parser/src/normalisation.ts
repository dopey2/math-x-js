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


// TODO test this
const normalizeNegativeNumbers = (arr: string[]) => {
    let symbols = [...arr];

    for(let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const lastSymbol = symbols[i - 1];
        const nextSymbol = symbols[i + 1];

        if(symbol === '-') {
            if((!lastSymbol || isOperator(lastSymbol)) && !(nextSymbol && nextSymbol === "(")) {
                const left = symbols.slice(0, i);

                const NEXT_NUMBER_INDEX = findNextNumberIndex(symbols, i);
                const mid = symbols.slice(i, NEXT_NUMBER_INDEX + 1).join("");
                const right = symbols.slice(NEXT_NUMBER_INDEX + 1, symbols.length);

                symbols = [...left, '{', mid, '}', ...right];
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
