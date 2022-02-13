export interface ToStringParam {
    isAfterOperator?: boolean;
}

export enum MathNodeType {
    Constant = "Constant",
    Fraction = "Fraction",
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Exponent = "Exponent",
    Matrix = "Matrix"
}

export default abstract class MathNode {
    /**
     * The type of the node
     * Check MathNodeType for all available nodes
     */
    public abstract type: MathNodeType;

    /**
     * Tell if an expression can be simplified or not.

     * If isAtomic === true, the expression can't be simplified.
     * For example a constant is atomic
     * Calling the next() function will return the same instance.
     *
     * If isAtomic === false, the expression can be simplified.
     * For example "4 + 3" is not atomic and can be simplified in "7"
     * Calling the next() function will simplify the expression, or return the next step.
     */
    public abstract isAtomic: boolean;


    /**
     * Represent the value of a constant as a number
     * If the node is not a constant, then value is always null
     */
    public value: number | null = null;

    /**
     * The next function will return the next step
     */
    public abstract next: () => MathNode;

    /**
     * Return a JSON representation of the node
     * @return {JSON}
     */
    public abstract toNode: () => Object;

    /**
     * Return the string of the node
     * The returned value will produce the same node if passed to the parser
     * @return {string}
     */
    public abstract toString: (data?: ToStringParam) => string;
    /**
     * Return a valid latex string of the current node
     * Tested with Mathjax & Katex
     * @return {string} valid latex as string
     */
    public abstract toTex: (data?: ToStringParam) => string;
    /**
     * This function aims to solve the node step by step
     * It calls the next() function until the node is atomic
     * @return {MathNode[]} - Each step
     */
    public solveAll: () => MathNode[] = () => {
        const steps: MathNode[] = [this];
        while (!steps[steps.length - 1].isAtomic) {
            const expression = steps[steps.length - 1].next();
            steps.push(expression);
        }

        return steps;
    };

    /**
     * This function aims to solve the node step by step
     * It calls the next() function until the node is atomic
     * @return {string[]} - Each step as valid latex string
     */
    public solveAllToTex = () => {
        return this.solveAll().map((x) => x.toTex());
    };

    /**
     * Solve the node until it is atomic
     * @return {MathNode} - The last node
     */
    public solve = <D extends MathNode>() => {
        const steps = this.solveAll();
        return steps[steps.length - 1] as D;
    };
}

