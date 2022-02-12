import { MatrixData } from "./Matrix";
import { ParenthesisData } from "./Parenthesis";

export interface ToStringParam {
    constant ? : {
        showNegativeInParenthesis? : boolean,
    }
}


export enum MathNodeType {
    constant = "constant",
    fraction = "fraction",
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    exponent = "exponent",
    matrix = "matrix"
}

export default abstract class MathNode {
    public abstract type: MathNodeType;

    /**
     * Tell if an expression can be simplified or not.
     * If atomic === true
     *   The expression can't be simplified. For example a constant is atomic
     *   Calling the next() function will return the same instance.
     *
     * If atomic === false;
     *   The expression can be simplified. For example "4 + 3" is not atomic and can be simplified in "7"
     *   Calling the next() function will simplify the expression, or return the next step.
     */
    public abstract atomic: boolean;

    public value: number | null = null;

    matrix?: MatrixData;
    parenthesis?: ParenthesisData;

    public abstract next: () => MathNode;
    public abstract toNode: () => Object;
    public abstract toString: (data?: ToStringParam) => string;
    public abstract toTex: (data?: ToStringParam) => string;

    public solveAll = () => {
        const steps: MathNode[] = [this];
        while (!steps[steps.length - 1].atomic) {
            const expression = steps[steps.length - 1].next();
            steps.push(expression);
        }

        return steps;
    };

    public solveAllToTex = () => {
        return this.solveAll().map((x) => x.toTex());
    };

    public solve = <D extends MathNode>() => {
        const steps = this.solveAll();
        return steps[steps.length - 1] as D;
    };

    // public solveValue = () => {
    //     return this.solve()?.value || 0;
    // };
}

