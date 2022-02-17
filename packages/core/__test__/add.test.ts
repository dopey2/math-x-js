import { Add, Constant, MathNodeType } from "@math-x-ts/core/src";


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
});

