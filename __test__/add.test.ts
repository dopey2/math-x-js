import Add from "../src/math-node/Add";
import Constant from "../src/math-node/Constant";
import { MathNodeType } from "../src/math-node/MathNode";

describe("Adding constant", () => {
    it("1 + 1", () => {
        const expression = new Add(new Constant(1), new Constant(1));
        const solved = expression.next();
        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(2);
        expect(solved?.toString()).toBe("2");
    });

    it("3 + 2", () => {
        const expression = new Add(new Constant(3), new Constant(2));
        const solved = expression.next();

        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(5);
        expect(solved?.toString()).toBe("5");
    });

    it("3 - 2", () => {
        const expression = new Add(new Constant(3), new Constant(-2));
        const solved = expression.next();

        expect(expression.type).toBe(MathNodeType.subtract);
        expect(solved).toBeDefined();
        expect(solved.atomic).toBe(true);
        expect(solved.constant).toBeDefined();
        expect(solved.constant?.value).toBe(1);
    });
});

