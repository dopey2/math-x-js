import { solve } from "../src";

describe("Testing the solve function", () => {
    it("1 + 1", () => {
        const mathNode = solve("1 + 1");
        expect(mathNode.value).toBe(2)
    })

    it("2 * 3 + 4", () => {
        const mathNode = solve("2 * 3 + 4");
        expect(mathNode.value).toBe(10)
    })

    it("2 * 3 + 4 * 5", () => {
        const mathNode = solve("2 * 3 + 4 * 5");
        expect(mathNode.value).toBe(26)
    })

    it("-2 + 3 * 4", () => {
        const mathNode = solve("-2 + 3 * 4");
        expect(mathNode.value).toBe(10)
    })

    it("2 + (3 - 4)", () => {
        const mathNode = solve("2 + (3 - 4)");
        expect(mathNode.value).toBe(1)
    })

    it("(5 + 3) * (4 : 2)", () => {
        const mathNode = solve("(5 + 3) * (4 : 2)");
        expect(mathNode.value).toBe(16)
    })
})