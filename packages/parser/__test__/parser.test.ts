import { MathNodeType } from "@math-x-ts/core/src";
import { parse } from '@math-x-ts/parser/src';


describe("Math parser",() => {

    it("1", () => {
        const expression = parse("0");
        expect(expression.type).toBe(MathNodeType.Constant);
        expect(expression.value).toBe(0);
        expect(expression.isAtomic).toBe(true);
    })

    it("0 + 0", () => {
        const expression = parse("0 + 0");
        const res = expression.solve();
        expect(expression.toString()).toBe("0 + 0");
        expect(res).toBeDefined();
        expect(res.value).toBe(0);
    });

    it("2 + 3", () => {
        const expression = parse("2 + 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 + 3");
        expect(res).toBeDefined();
        expect(res.value).toBe(5);
    });

    it("-2 + 6", () => {
        const expression = parse("-2 + 6");
        const res = expression.solve();
        expect(expression.toString()).toBe("-2 + 6");
        expect(res).toBeDefined();
        expect(res.value).toBe(4);
    });

    it("2 * 3", () => {
        const expression = parse("2 * 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * 3");
        expect(res).toBeDefined();
        expect(res.value).toBe(6);
    });

    it("-2 * 3", () => {
        const expression = parse("-2 * 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("-2 * 3");
        expect(res).toBeDefined();
        expect(res.value).toBe(-6);
    });

    it("2 + 3 * 4", () => {
        const expression = parse("2 + 3 * 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 + 3 * 4");
        expect(res).toBeDefined();
        expect(res.value).toBe(14);
    });

    it("2 * 3 + 4", () => {
        const expression = parse("2 * 3 + 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * 3 + 4");
        expect(res).toBeDefined();
        expect(res.value).toBe(10);
    });

    it("2 * 3 + 4 * 5", () => {
        const expression = parse("2 * 3 + 4 * 5");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * 3 + 4 * 5");
        expect(res).toBeDefined();
        expect(res.value).toBe(26);
    });

    it("5 - 4 + 3 * 6 + 10", () => {
        const expression = parse("5 - 4 + 3 * 6 + 10");
        const res = expression.solve();
        expect(expression.toString()).toBe("5 - 4 + 3 * 6 + 10");
        expect(res).toBeDefined();
        expect(res.value).toBe(29);
    });

    it("-2 + 5", () => {
        const expression = parse("-2 + 5");
        const res = expression.solve();
        expect(expression.toString()).toBe("-2 + 5");
        expect(res).toBeDefined();
        expect(res.value).toBe(3);
    });

    it("-2 + 3 * 4", () => {
        const expression = parse("-2 + 3 * 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("-2 + 3 * 4");
        expect(res).toBeDefined();
        expect(res.value).toBe(10);
    });

    it("-2 * 3 + 4", () => {
        const expression = parse("-2 * 3 + 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("-2 * 3 + 4");
        expect(res).toBeDefined();
        expect(res.value).toBe(-2);
    });
});
