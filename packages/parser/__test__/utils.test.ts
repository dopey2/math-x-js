import { splitStringExpressionToSymbols } from "../src/utils";

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