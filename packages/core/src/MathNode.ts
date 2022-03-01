export interface ToStringParam {
    isAfterOperator?: boolean;
}

export enum MathNodeType {
    Add = "Add",
    Constant = "Constant",
    Divide = "Divide",
    Fraction = "Fraction",
    Exponent = "Exponent",
    Multiply = "Multiply",
    Negative = "Negative",
    Parenthesis = "Parenthesis",
    Subtract = "Subtract",
}

/**
 * Base class of every math node.
 */
export default abstract class MathNode {
    /**
     * Represent the value of a constant as a number.
     * If the node is not a constant, then value is always null.
     */
    public value: number | null = null;

    /**
     * The type of the node
     * Check MathNodeType for all available nodes.
     */
    public abstract type: MathNodeType;

    /**
     * Tell if an expression can be simplified or not.
     *
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
     * The next function will return the node of the next step.
     *
     * - Each operation should implement its own logic to get the next step.
     * - The next operation should simplify the deepest node from the binary tree.
     * - Eg: 'new Add(new Constant(2) , new Constant(3)).next()' will become 'new Constant(5)'.
     */
    public abstract next(args?: {
        isNegative?: boolean
    }): MathNode;

    /**
     * Return a JSON representation of the node.
     *
     * @returns {JSON}
     */
    public abstract toJson(): Object;

    /**
     * Return the string of the node.
     * The returned value will produce the same node if passed to the parser.
     *
     * @returns {string}
     */
    public abstract toString(data?: ToStringParam): string;
    /**
     * Return a valid latex string of the current node.
     * Tested with Mathjax & Katex.
     *
     * @returns {string} Valid latex as string.
     */
    public abstract toTex(data?: ToStringParam): string;

    /**
     * Do a deep equal.
     *
     * @param {MathNode} mathNode A math node.
     * @returns {boolean} Tell if is the nodes are equals.
     */
    public abstract isEqual(mathNode: MathNode): boolean;
    /**
     * This function aims to solve the node step by step.
     * It calls the next() function until the node is atomic.
     *
     * @returns {MathNode[]} - Each step.
     */
    public solveAll(): MathNode[] {
        const steps: MathNode[] = [this];
        while (!steps[steps.length - 1].isAtomic) {
            const expression = steps[steps.length - 1].next();
            steps.push(expression);
        }

        return steps;
    };

    /**
     * This function aims to solve the node step by step.
     * It calls the next() function until the node is atomic.
     *
     * @returns {Object[]} - Each step as a json.
     */
    public solveAllToJson(): Object[] {
        return this.solveAll().map((x) => x.toJson());
    };

    /**
     * This function aims to solve the node step by step.
     * It calls the next() function until the node is atomic.
     *
     * @returns {string[]} - Each step as a string.
     */
    public solveAllToString(): string[] {
        return this.solveAll().map((x) => x.toString());
    };

    /**
     * This function aims to solve the node step by step.
     * It calls the next() function until the node is atomic.
     *
     * @returns {string[]} - Each step as valid latex string.
     */
    public solveAllToTex(): string[] {
        return this.solveAll().map((x) => x.toTex());
    };

    /**
     * Solve the node until it is atomic.
     *
     * @returns {MathNode} - The last node.
     */
    public solve<D extends MathNode>() {
        const steps = this.solveAll();
        return steps[steps.length - 1] as D;
    };

    /**
     * Solve the node until it is atomic and return its value.
     *
     * @returns {number | NaN} The value of the node.
     */
    public evaluate(): number {
        return this.solve().value ?? NaN;
    }
}