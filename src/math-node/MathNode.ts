import { ConstantData } from "./Constant";
import { FractionData } from "./Fraction";
import { MatrixData } from "./Matrix";
import { ParenthesisData } from "./Parenthesis";

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
    abstract type: MathNodeType;

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
    abstract atomic: boolean;

    constant?: ConstantData;
    fraction?: FractionData;
    matrix?: MatrixData;
    parenthesis?: ParenthesisData;

    abstract next: () => MathNode;
    abstract toString: (data?: any) => string;
    abstract toTex: (data?: {
        constant?: {
            showSign?: boolean,
            negativeOnly?: boolean,
            positiveOnly?: boolean,
            hideSign?: boolean,
            showNegativeInParenthesis?: boolean,
        }
    }) => string;

    solveAll = () => {
        const steps: MathNode[] = [this];
        while (!steps[steps.length - 1].atomic) {
            const expression = steps[steps.length - 1].next();
            steps.push(expression);
        }

        return steps;
    };

    solveAllToTex = () => {
        return this.solveAll().map((x) => x.toTex());
    };

    solve = <D extends MathNode>() => {
        const steps = this.solveAll();
        return steps[steps.length - 1] as D;
    };

    solveValue = () => {
        return this.solve()?.constant?.value || 0;
    };
}

