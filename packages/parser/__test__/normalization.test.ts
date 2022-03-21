import { splitStringExpressionToSymbols } from "../src/utils";
import { normalizeNegativeNumbers } from "../src/normalisation";


describe("Normalize negative numbers", () => {
    it("case 1", () => {
        const expression = "3 - 2"
        const symbols = splitStringExpressionToSymbols(expression);
        const normalized = normalizeNegativeNumbers(symbols);
        expect(normalized).toEqual(["3", "-", "2"])
    })

    it("case 2", () => {
        const expression = "3 * -2"
        const symbols = splitStringExpressionToSymbols(expression);
        const normalized = normalizeNegativeNumbers(symbols);
        expect(normalized).toEqual(["3", "*", "(", "-2", ")"])
    })

    it("case 3", () => {
        const expression = "8 - (2 + 4)"
        const symbols = splitStringExpressionToSymbols(expression);
        const normalized = normalizeNegativeNumbers(symbols);
        expect(normalized).toEqual(["8", "-", "(", "2", "+", "4", ")"])
    })
})

