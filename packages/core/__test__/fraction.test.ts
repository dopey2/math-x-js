import { parse } from "@math-x-ts/parser/src/";
import { Constant, Fraction, Multiply } from "@math-x-ts/core/src";

describe("isEqual", () => {
    it("{10 / 6} * 2 & {10 / 6} * 2 should be true", () => {

        const mathNode1 = new Multiply(
            new Fraction(
                new Constant(10),
                new Constant(6)
            ),
            new Constant(2)
        )

        const mathNode2 = parse("{{10} / {6}} * 2");
        expect(mathNode1.isEqual(mathNode2)).toBe(true)
    });

    it("{10 / 5} & {10 / 6} should be false", () => {

        const mathNode1 = new Fraction(
                new Constant(10),
                new Constant(5)
        );

        const mathNode2 = parse("{{10} / {6}}");

        expect(mathNode1.isEqual(mathNode2)).toBe(false)
    });
});
