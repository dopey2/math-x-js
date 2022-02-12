import Constant from "../src/math-node/Constant";
import Multiply from "../src/math-node/Multiply";
import {MathNodeType} from "../src/math-node/MathNode";

describe("Adding constant", () => {
    it("1 * 1", () => {
        const expression = new Multiply(new Constant(1), new Constant(1));
        const solved = expression.next();
        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);

        expect(solved.type).toBe(MathNodeType.constant);
        expect(solved.value).toBe(1);
        expect(solved.toString()).toBe("1");
    });

    it("3 * 2", () => {
        const expression = new Multiply(new Constant(3), new Constant(2));
        const solved = expression.next();

        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);

        expect(solved.type).toBe(MathNodeType.constant);
        expect(solved.value).toBe(6);
        expect(solved.toString()).toBe("6");
    });
});