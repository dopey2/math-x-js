import { isInBracket, isInParenthesis, splitStringExpressionToSymbols } from "../src/utils";

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

