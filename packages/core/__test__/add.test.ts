import { Add, Constant, MathNodeType } from "@math-x-ts/core/src";
import { parse } from "@math-x-ts/parser/src";


describe("Adding constant", () => {
    it("1 + 1", () => {
        const mathNode = new Add(new Constant(1), new Constant(1));

        expect(mathNode.type).toBe(MathNodeType.Add);
        expect(mathNode.isAtomic).toBe(false);

        expect(mathNode.toString()).toBe("1 + 1");
        expect(mathNode.toTex()).toBe("1 + 1");
        expect(mathNode.toJson()).toEqual({
            type: MathNodeType.Add,
            left: {
                type: MathNodeType.Constant,
                value: 1,
            },
            right: {
                type: MathNodeType.Constant,
                value: 1,
            },
        });

        const solved = mathNode.next();
        expect(solved).toBeDefined();
        expect(solved?.isAtomic).toBe(true);
        expect(solved.type).toBe(MathNodeType.Constant);
        expect(solved.value).toBe(2);
        expect(solved.toString()).toBe("2");
    });

    it("3 + 2", () => {
        const expression = new Add(new Constant(3), new Constant(2));
        const solved = expression.next();

        expect(solved).toBeDefined();
        expect(solved?.isAtomic).toBe(true);
        expect(solved.type).toBe(MathNodeType.Constant);
        expect(solved.value).toBe(5);
        expect(solved.toString()).toBe("5");
    });

    it("3 - 2", () => {
        const expression = new Add(new Constant(3), new Constant(-2));
        const solved = expression.next();

        expect(expression.type).toBe(MathNodeType.Subtract);
        expect(solved).toBeDefined();
        expect(solved.type).toBe(MathNodeType.Constant);
        expect(solved.value).toBe(1);
        expect(solved.toString()).toBe("1");
    });

    it("1 + 2 isEqual 1 + 2 should be true", () => {
        const mathNode1 = new Add(new Constant(1), new Constant(2));
        const mathNode2 = parse("1 + 2");
        expect(mathNode1.isEqual(mathNode2)).toBe(true)
    });

    it("1 + 2 isEqual 5 + 4 should be false", () => {
        const mathNode1 = new Add(new Constant(1), new Constant(2));
        const mathNode2 = parse("5 + 4");
        expect(mathNode1.isEqual(mathNode2)).toBe(false)
    });
});

