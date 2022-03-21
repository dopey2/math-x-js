import { isInBracket, isInParenthesis, splitStringExpressionToSymbols } from "../src/utils";

describe("Split expression to symbols", () => {
    it("case 1", () => {
        const expression = "1 + 2 * 3";
        const symbols = splitStringExpressionToSymbols(expression);
        expect(symbols).toEqual(["1", "+", "2", "*", "3"])
    })

    it("case 2", () => {
        const expression = "-1 + 2";
        const symbols = splitStringExpressionToSymbols(expression);
        expect(symbols).toEqual(["-", "1", "+", "2"])
    })

    it("case 3", () => {
        const expression = "11 + 22 * 33";
        const symbols = splitStringExpressionToSymbols(expression);
        expect(symbols).toEqual(["11", "+", "22", "*", "33"])
    })
})

describe("Check if is in parenthesis", () => {
    it("case 1", () => {
        const expression = "(1 + 1)"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInParenthesis(symbols);
        expect(res).toBe(true)
    })

    it("case 2", () => {
        const expression = "1 + 1"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInParenthesis(symbols);
        expect(res).toBe(false)
    })

    it("case 3", () => {
        const expression = "(1 + 1) * (2 + 2)"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInParenthesis(symbols);
        expect(res).toBe(false)
    })
})

describe("Check if is in brackets", () => {
    it("case 1", () => {
        const expression = "{1 + 1}"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInBracket(symbols);
        expect(res).toBe(true)
    })

    it("case 2", () => {
        const expression = "1 + 1"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInBracket(symbols);
        expect(res).toBe(false)
    })

    it("case 3", () => {
        const expression = "{1 + 1} * {2 + 2}"
        const symbols = splitStringExpressionToSymbols(expression);
        const res = isInBracket(symbols);
        expect(res).toBe(false)
    })
})

