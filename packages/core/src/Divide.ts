import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import BaseOperation from "./BaseOperation";

/**
 * Represent the division operation as a math node.
 */
export default class Divide extends BaseOperation {

    /**
     * @param {MathNode} left The left node.
     * @param {MathNode} right The right node.
     */
    constructor(left: MathNode, right: MathNode) {
        super(left, right, MathNodeType.Divide, ":");
        this.left = left;
        this.right = right;
    }

    /**
     * @inheritDoc
     */
    concreteNext(): MathNode {
        if (!this.left.isAtomic || !this.right.isAtomic) {
            const [leftNode, rightNode] = super.getConstantsFromParenthesis();

            if(leftNode instanceof Constant && rightNode instanceof Constant) {
                return new Constant(leftNode.value / rightNode.value);
            }

            return new Divide(this.left.next(), this.right.next());
        }

        return this;
    };

    /**
     * Return the division between left and right.
     *
     * @param {number} left The left operand.
     * @param {number} right The right operand.
     * @returns {number} The division result.
     */
    operation(left: number, right: number): number {
        return left / right;
    }
}
