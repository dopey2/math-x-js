import { parse } from "@math-x-ts/parser/src/";
import { Add, Constant, Fraction, Multiply, MathNode, MathNodeType } from "@math-x-ts/core/src";


describe("Fraction with constant", () => {
    it("6 / 3", () => {
        const mathNode = new Fraction(new Constant(6) as MathNode, new Constant(3) as MathNode);

        expect(mathNode.type).toBe(MathNodeType.Fraction);
        expect(mathNode.isAtomic).toBe(false);

        expect(mathNode.toString()).toBe("{6} / {3}");
        expect(mathNode.toTex()).toBe("\\frac{6}{3}");
        expect(mathNode.toJson()).toEqual({
            type: MathNodeType.Fraction,
            numerator: {
                type: MathNodeType.Constant,
                value: 6,
            },
            denominator: {
                type: MathNodeType.Constant,
                value: 3,
            },
        });

        const solved = mathNode.next();
        expect(solved).toBeDefined();
        expect(solved?.isAtomic).toBe(true);
        expect(solved.type).toBe(MathNodeType.Constant);
        expect(solved.value).toBe(2);
        expect(solved.toString()).toBe("2");
    });
});

describe("Fraction with operations", () => {
    it("(3 + 5) / (1 + 1)", () => {

        const add3And5 = new Add(new Constant(3) as MathNode, new Constant(5) as MathNode) as MathNode;
        const add1And1 = new Add(new Constant(1) as MathNode, new Constant(1) as MathNode) as MathNode;
        const expression = new Fraction(add3And5, add1And1);

        const newFraction = expression.next() as Fraction;
        expect(newFraction).toBeDefined();
        expect(newFraction?.isAtomic).toBe(false);
        expect(newFraction?.getNumerator()).toBeDefined();
        expect(newFraction?.getDenominator()).toBeDefined();
        expect(newFraction?.getNumerator().value).toBe(8);
        expect(newFraction?.getDenominator().value).toBe(2);

        const solved = newFraction.next();

        expect(solved).toBeDefined();
        expect(solved?.isAtomic).toBe(true);
        expect(solved?.type).toBe(MathNodeType.Constant);
        expect(solved?.value).toBe(4);
        expect(solved?.toString()).toBe("4");
    });
});


describe("Add fraction and constant", () => {
    it("4 / 2 + 6", () => {

        const expression = "4 / 2 + 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();

        expect(node.toString()).toBe('{4} / {2} + 6');
        expect(node1.toString()).toBe('2 + 6');
        expect(node2.toString()).toBe('8');
    });
});

describe("Add fraction and constant", () => {
    it("4 / 3 + 6", () => {

        const expression = "4 / 3 + 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node.toString()).toBe('{4} / {3} + 6');
        expect(node1.toString()).toBe('{4} / {3} + {6} / {1}');
        expect(node2.toString()).toBe('{4} / {3} + {6 * 3} / {1 * 3}');
        expect(node3.toString()).toBe('{4} / {3} + {18} / {3}');
        expect(node4.toString()).toBe('{4 + 18} / {3}');
        expect(node5.toString()).toBe('{22} / {3}');
        expect(node5.isAtomic).toBe(true);
    });
});

describe("Add fraction with same denominator", () => {
    it("4 / 3 + 5 / 3", () => {

        const expression = "4 / 3 + 5 / 3";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();

        expect(node.toString()).toBe('{4} / {3} + {5} / {3}');
        expect(node1.toString()).toBe('{4 + 5} / {3}');
        expect(node2.toString()).toBe('{9} / {3}');
        expect(node3.toString()).toBe('3');
        expect(node3.isAtomic).toBe(true);
    });
});


describe("Add fractions with different denominator", () => {
    it("8 / 5 + 10 / 6", () => {

        const expression = "8 / 5 + 10 / 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();

        expect(node.toString()).toBe('{8} / {5} + {10} / {6}');
        expect(node1.toString()).toBe('{8 * 6} / {5 * 6} + {10 * 5} / {6 * 5}');
        expect(node2.toString()).toBe('{48} / {30} + {50} / {30}');
        expect(node3.toString()).toBe('{48 + 50} / {30}');
        expect(node4.toString()).toBe('{98} / {30}');
        expect(node4.isAtomic).toBe(true);
    });
});

describe("Add fractions different denominator", () => {
    it("8 / 4 + 10 / 6", () => {

        const expression = "8 / 4 + 10 / 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();

        expect(node.toString()).toBe('{8} / {4} + {10} / {6}');
        expect(node1.toString()).toBe('{8 * 3} / {4 * 3} + {10 * 2} / {6 * 2}');
        expect(node2.toString()).toBe('{24} / {12} + {20} / {12}');
        expect(node3.toString()).toBe('{24 + 20} / {12}');
        expect(node4.toString()).toBe('{44} / {12}');
        expect(node4.isAtomic).toBe(true);
    });
});

describe("Add fraction++", () => {
    it("10 / {3 + 4} + {8} / 5", () => {

        const expression = "10 / {3 + 4} + {8} / 5";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node.toString()).toBe('{10} / {3 + 4} + {8} / {5}');
        expect(node1.toString()).toBe('{10} / {7} + {8} / {5}');
        expect(node2.toString()).toBe('{10 * 5} / {7 * 5} + {8 * 7} / {5 * 7}');
        expect(node3.toString()).toBe('{50} / {35} + {56} / {35}');
        expect(node4.toString()).toBe('{50 + 56} / {35}');
        expect(node5.toString()).toBe('{106} / {35}');
        expect(node5.isAtomic).toBe(true);
    });
});

describe("Subtract fraction and constant", () => {
    it("4 / 2 - 6", () => {

        const expression = "4 / 2 - 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();

        expect(node.toString()).toBe('{4} / {2} - 6');
        expect(node1.toString()).toBe('2 - 6');
        expect(node2.toString()).toBe('-4');
    });
});

describe("Subtract fraction and constant", () => {
    it("4 / 3 - 6", () => {

        const expression = "4 / 3 - 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node.toString()).toBe('{4} / {3} - 6');
        expect(node1.toString()).toBe('{4} / {3} - {6} / {1}');
        expect(node2.toString()).toBe('{4} / {3} - {6 * 3} / {1 * 3}');
        expect(node3.toString()).toBe('{4} / {3} - {18} / {3}');
        expect(node4.toString()).toBe('{4 - 18} / {3}');
        expect(node5.toString()).toBe('{-14} / {3}');
        expect(node5.isAtomic).toBe(true);
    });
});

describe("Subtract fraction", () => {
    it("4 / 3 - 5 / 3", () => {

        const expression = "4 / 3 - 5 / 3";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();

        expect(node.toString()).toBe('{4} / {3} - {5} / {3}');
        expect(node1.toString()).toBe('{4 - 5} / {3}');
        expect(node2.toString()).toBe('{-1} / {3}');
        expect(node2.isAtomic).toBe(true);
    });
});


describe("Subtract fractions", () => {
    it("8 / 5 - 10 / 6", () => {

        const expression = "8 / 5 - 10 / 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();

        expect(node.toString()).toBe('{8} / {5} - {10} / {6}');
        expect(node1.toString()).toBe('{8 * 6} / {5 * 6} - {10 * 5} / {6 * 5}');
        expect(node2.toString()).toBe('{48} / {30} - {50} / {30}');
        expect(node3.toString()).toBe('{48 - 50} / {30}');
        expect(node4.toString()).toBe('{-2} / {30}');
        expect(node4.isAtomic).toBe(true);
    });
});

describe("Subtract fractions", () => {
    it("8 / 4 - 10 / 6", () => {

        const expression = "8 / 4 - 10 / 6";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();

        expect(node.toString()).toBe('{8} / {4} - {10} / {6}');
        expect(node1.toString()).toBe('{8 * 3} / {4 * 3} - {10 * 2} / {6 * 2}');
        expect(node2.toString()).toBe('{24} / {12} - {20} / {12}');
        expect(node3.toString()).toBe('{24 - 20} / {12}');
        expect(node4.toString()).toBe('{4} / {12}');
        expect(node4.isAtomic).toBe(true);
    });
});

describe("Subtract fractions++", () => {
    it("10 / {3 + 4} - {8} / 5", () => {

        const expression = "10 / {3 + 4} - {8} / 5";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();
        const node4 = node3.next();
        const node5 = node4.next();

        expect(node.toString()).toBe('{10} / {3 + 4} - {8} / {5}');
        expect(node1.toString()).toBe('{10} / {7} - {8} / {5}');
        expect(node2.toString()).toBe('{10 * 5} / {7 * 5} - {8 * 7} / {5 * 7}');
        expect(node3.toString()).toBe('{50} / {35} - {56} / {35}');
        expect(node4.toString()).toBe('{50 - 56} / {35}');
        expect(node5.toString()).toBe('{-6} / {35}');
        expect(node5.isAtomic).toBe(true);
    });
});

describe("Multiply fractions", () => {
    it("10 / 5 * 3 / 2", () => {

        const expression = "{{10} / {5}} * {{3} / {2}}";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();
        const node3 = node2.next();

        expect(node.toString()).toBe('{10} / {5} * {3} / {2}');
        expect(node1.toString()).toBe('{10 * 3} / {5 * 2}');
        expect(node2.toString()).toBe('{30} / {10}');
        expect(node3.toString()).toBe('3');
        expect(node3.isAtomic).toBe(true);
    });
});


describe("Multiply fraction and constant", () => {
    it("{10 / 5} * 3", () => {

        const expression = "{{10} / {5}} * 3";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();

        expect(node.toString()).toBe('{10} / {5} * 3');
        expect(node1.toString()).toBe('2 * 3');
        expect(node2.toString()).toBe('6');
        expect(node2.isAtomic).toBe(true);
    });
});


describe("Multiply fraction and constant", () => {
    it("{10 / 6} * 2", () => {

        const expression = "{{10} / {6}} * 2";
        const node = parse(expression);
        const node1 = node.next();
        const node2 = node1.next();

        expect(node.toString()).toBe('{10} / {6} * 2');
        expect(node1.toString()).toBe('{10 * 2} / {6 * 2}');
        expect(node2.toString()).toBe('{20} / {12}');
        expect(node2.isAtomic).toBe(true);
    });
});


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
