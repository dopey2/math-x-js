import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";
import { Parenthesis } from "./index";

/**
 * The base class for [addition, subtraction, multiplication, division].
 */
export default abstract class BaseOperation extends MathNode {
    public type: MathNodeType;
    public isAtomic = false;

    public left: MathNode;
    public right: MathNode;

    private readonly symbol!: string;


    /**
     * @param {MathNode} left - The left node.
     * @param {MathNode} right - The right node.
     * @param {MathNodeType} type - The node type.
     * @param {string} symbol - The symbol of the operator.
     */
    constructor(left: MathNode, right: MathNode, type: MathNodeType, symbol: string) {
        super();
        this.left = left;
        this.right = right;

        this.type = type;
        this.symbol = symbol;
    }

    /**
     * @inheritDoc
     */
    toJson() {
        return {
            type: this.type,
            left: this.left.toJson(),
            right: this.right.toJson(),
        };
    };

    /**
     * @inheritDoc
     */
    toString(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} ${this.symbol} ${right}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const left = this.left.toTex({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toTex({ isAfterOperator: true });
        return `${left} ${this.symbol} ${right}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-expect-error
        return this instanceof MathNode && this.right.isEqual(mathNode.right) && this.left.isEqual(mathNode.left);
    }

    /**
     * A shared logic for all base operations.
     *
     * @returns {MathNode} The next step.
     */
    public next(): MathNode {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.operation(this.left.value, this.right.value));
        }

        /**
         * Check if one of the operands override the operator.
         */
        const leftOverride = this.left.override && this.left.override(this.type);
        const rightOverride = this.right.override && this.right.override(this.type);

        if(typeof leftOverride === "function") {
            return leftOverride(this.right);
        }

        if(typeof rightOverride === "function") {
            return rightOverride(this.left);
        }

        return this.concreteNext();
    }

    /**
     * Check if the left and right operands are constants.
     * If the operands are parenthesis containing a constant then it returns the constants from the parenthesis.
     *
     * @returns {MathNode[]} An array of operands [leftNode, rightNode].
     */
    protected getConstantsFromParenthesis(): MathNode[] {
        if (!this.left.isAtomic || !this.right.isAtomic) {
            let leftNode = this.left;
            let rightNode = this.right;

            if(this.left instanceof Parenthesis) {
                leftNode = this.left.content;
            }

            if(this.right instanceof Parenthesis) {
                rightNode = this.right.content;
            }

            if(leftNode instanceof Constant && rightNode instanceof Constant) {
                return [leftNode, rightNode];
            }
        }

        return [];
    }

    /**
     * A more concrete implementation of the next method
     * that should be defined in concrete classes.
     *
     * @protected
     */
    protected abstract concreteNext(): MathNode
    /**
     * Each subclass should implement its own operation.
     *
     * @param {number} left
     * @param {number} right
     */
    abstract operation(left: number, right: number): number
}
