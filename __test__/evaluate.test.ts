import { evaluate } from "../src";

describe("Testing the evaluate function", () => {
    it("1 + 1", () => {
        const value = evaluate("1 + 1");
        expect(value).toBe(2)
    })

    it("2 * 3 + 4", () => {
        const value = evaluate("2 * 3 + 4");
        expect(value).toBe(10)
    })

    it("2 * 3 + 4 * 5", () => {
        const value = evaluate("2 * 3 + 4 * 5");
        expect(value).toBe(26)
    })

    it("-2 + 3 * 4", () => {
        const value = evaluate("-2 + 3 * 4");
        expect(value).toBe(10)
    })

    it("2 + (3 - 4)", () => {
        const value = evaluate("2 + (3 - 4)");
        expect(value).toBe(1)
    })

    it("(5 + 3) * (4 : 2)", () => {
        const value = evaluate("(5 + 3) * (4 : 2)");
        expect(value).toBe(16)
    })
})