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

    it("2 * (3 + 4)", () => {
        const expression = parse("2 * (3 + 4)");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * (3 + 4)");
        expect(res).toBeDefined();
        expect(res.value).toBe(14);
    });

    it("2 * (3 - 4)", () => {
        const expression = parse("2 * (3 - 4)");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * (3 - 4)");
        expect(res).toBeDefined();
        expect(res.value).toBe(-2);
    });

    it("2 + (3 - 4)", () => {
        const expression = parse("2 + (3 - 4)");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 + (3 - 4)");
        expect(res).toBeDefined();
        expect(res.value).toBe(1);
    });

    it("10 - (2 * 3)", () => {
        const expression = parse("10 - (2 * 3)");
        const res = expression.solve();
        expect(expression.toString()).toBe("10 - (2 * 3)");
        expect(res).toBeDefined();
        expect(res.value).toBe(4);
    });


    it("-10 - (2 * 3)", () => {
        const expression = parse("-10 - (2 * 3)");
        const res = expression.solve();
        expect(expression.toString()).toBe("-10 - (2 * 3)");
        expect(res).toBeDefined();
        expect(res.value).toBe(-16);
    });

    it("-10 - (2 * 3) + 5", () => {
        const expression = parse("-10 - (2 * 3) + 5");
        const res = expression.solve();
        expect(expression.toString()).toBe("-10 - (2 * 3) + 5");
        expect(res).toBeDefined();
        expect(res.value).toBe(-11);
    });


    it("(2 + 3) * (4 + 5)", () => {
        const expression = parse("(2 + 3) * (4 + 5)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(2 + 3) * (4 + 5)");
        expect(res).toBeDefined();
        expect(res.value).toBe(45);
    });


    it("(2 * 3) + (4 * 5)", () => {
        const expression = parse("(2 * 3) + (4 * 5)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(2 * 3) + (4 * 5)");
        expect(res).toBeDefined();
        expect(res.value).toBe(26);
    });

    it("(2 * 3) - (4 * 5)", () => {
        const expression = parse("(2 * 3) - (4 * 5)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(2 * 3) - (4 * 5)");
        expect(res).toBeDefined();
        expect(res.value).toBe(-14);
    });

    it("(3 + (2 * 3)) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("(3 + (2 * 3)) * 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(18);
    });


    it("(3 + (2 * 3)) * 2 + 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 + 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("(3 + (2 * 3)) * 2 + 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(20);
    });


    it("(3 + (2 * 3)) * 2 - (4 + 5)", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(3 + (2 * 3)) * 2 - (4 + 5)");
        expect(res).toBeDefined();
        expect(res.value).toBe(9);
    });

    it("(3 + (2 * 3)) * 2 - (4 + 5) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(0);
    });


    it("(3 + (2 * 3)) * 2 - (4 + 5) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(0);
    });


    it("(1 + 1)", () => {
        const expression = parse("(1 + 1)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(1 + 1)");
        expect(res).toBeDefined();
        expect(res.value).toBe(2);
    });

    it("(1 + 1) * (2 + 2) + (3 + 3)", () => {
        const expression = parse("(1 + 1) * (2 + 2) + (3 + 3)");
        const res = expression.solve();
        expect(expression.toString()).toBe("(1 + 1) * (2 + 2) + (3 + 3)");
        expect(res).toBeDefined();
        expect(res.value).toBe(14);
    });
});


describe("Math parser, exponents", () => {
    it("2 ^ 3", () => {
        const expression = parse("2 ^ 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 ^ {3}");
        expect(res).toBeDefined();
        expect(res.value).toBe(8);
    });

    it("2 ^ {3}", () => {
        const expression = parse("2 ^ {3}");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 ^ {3}");
        expect(res).toBeDefined();
        expect(res.value).toBe(8);
    });

    it("2 ^ {2 + 2}", () => {
        const expression = parse("2 ^ {2 + 2}");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 ^ {2 + 2}");
        expect(res).toBeDefined();
        expect(res.value).toBe(16);
    });

    it("4 * 3 ^ 2", () => {
        const expression = parse("4 * 3 ^ 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("4 * 3 ^ {2}");
        expect(res).toBeDefined();
        expect(res.value).toBe(36);
    });

    it("(4 * 3)^ 2", () => {
        const expression = parse("(4 * 3) ^ 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("(4 * 3) ^ {2}");
        expect(res).toBeDefined();
        expect(res.value).toBe(144);
    });

    it("(1 + 3) ^ 2 * 3 ", () => {
        const expression = parse("(1 + 3) ^ 2 * 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("(1 + 3) ^ {2} * 3");
        expect(res).toBeDefined();
        expect(res.value).toBe(48);
    });

    it("(1 + 3) ^ {2 * 3} ", () => {
        const expression = parse("(1 + 3) ^ {2 * 3}");
        const res = expression.solve();
        expect(expression.toString()).toBe("(1 + 3) ^ {2 * 3}");
        expect(res).toBeDefined();
        expect(res.value).toBe(4096);
    });

    it("5 ^ 0", () => {
        const expression = parse("5 ^ 0");
        const res = expression.solve();
        expect(expression.toString()).toBe("5 ^ {0}");
        expect(res).toBeDefined();
        expect(res.value).toBe(1);
    });
});


describe("Math parser, edge case", () => {
    it("3 + -2", () => {
        const n = -2;
        const expression = parse(`3 + ${n}`);
        const res = expression.solve();
        expect(expression.toString()).toBe("3 - 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(1);
    });

    it("3 * -2", () => {
        const n = -2;
        const expression = parse(`3 * ${n}`);
        const res = expression.solve();
        expect(expression.toString()).toBe("3 * (-2)");
        expect(res).toBeDefined();
        expect(res.value).toBe(-6);
    });

    it("3 - -2", () => {
        const n = -2;
        const expression = parse(`3 - ${n}`);
        const res = expression.solve();
        expect(expression.toString()).toBe("3 - (-2)");
        expect(res).toBeDefined();
        expect(res.value).toBe(5);
    });

    it("-0 + 0", () => {
        const expression = parse("-0 + 0");
        const res = expression.solve();
        expect(expression.toString()).toBe("0 + 0");
        expect(res).toBeDefined();
        expect(res.value).toBe(0);
    });
});

describe("Math parser fraction expressions", () => {
    it("2 * 8 / 4", () => {
        const expression = parse("2 * 8 / 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 * {8} / {4}");
        expect(res).toBeDefined();
        expect(res.value).toBe(4);
    });

    it("2 + 5 + 8 / 4", () => {
        const expression = parse("2 + 5 + 8 / 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("2 + 5 + {8} / {4}");
        expect(res).toBeDefined();
        expect(res.value).toBe(9);
    });


    it("{2 * 8} / {4}", () => {
        const expression = parse("{2 * 8} / 4");
        const res = expression.solve();
        expect(expression.toString()).toBe("{2 * 8} / {4}");
        expect(res).toBeDefined();
        expect(res.value).toBe(4);
    });


    it("8 / 4 * 2", () => {
        const expression = parse("8 / 4 * 2");
        const res = expression.solve();
        expect(expression.toString()).toBe("{8} / {4} * 2");
        expect(res).toBeDefined();
        expect(res.value).toBe(4);
    });

    it("8 / 4 + 3", () => {
        const expression = parse("8 / 4 + 3");
        const res = expression.solve();
        expect(expression.toString()).toBe("{8} / {4} + 3");
        expect(res).toBeDefined();
        expect(res.value).toBe(5);
    });


    it("21 / {4 + 3}", () => {
        const expression = parse("21 / {4 + 3}");
        const res = expression.solve();
        expect(expression.toString()).toBe("{21} / {4 + 3}");
        expect(res).toBeDefined();
        expect(res.value).toBe(3);
    });
})

describe("Negative values edges case", () => {
    const expression1 = "-(-(-(-(5))))";

    it(expression1, () => {
        const node1 = parse(expression1);
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node1.toString()).toBe(expression1);
        expect(node2.toString()).toBe("-(-(-(-5)))")
        expect(node3.toString()).toBe("-(-(5))")
        expect(node4.toString()).toBe("-(-5)")
        expect(node5.toString()).toBe("5")
        expect(node5.value).toBe(5);
    })

    const expression2 = "-(-(-(-(-5))))";

    it(expression2, () => {
        const node1 = parse(expression2);
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node1.toString()).toBe(expression2);
        expect(node2.toString()).toBe("-(-(-(5)))")
        expect(node3.toString()).toBe("-(-(-5))")
        expect(node4.toString()).toBe("-(5)")
        expect(node5.toString()).toBe("-5")
        expect(node5.value).toBe(-5);
    })

    const expression3 = "-(2 + 3)";

    it(expression3, () => {
        const node1 = parse(expression3);
        const node2 = node1.next();
        const node3 = node2.next();

        expect(node1.toString()).toBe(expression3);
        expect(node2.toString()).toBe("-(5)")
        expect(node3.toString()).toBe("-5")
    })

    const expression4 = "-(-(2 + 3))";

    it(expression4, () => {
        const node1 = parse(expression4);
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();

        expect(node1.toString()).toBe(expression4);
        expect(node2.toString()).toBe("-(-(5))")
        expect(node3.toString()).toBe("-(-5)")
        expect(node4.toString()).toBe("5")
    })


})