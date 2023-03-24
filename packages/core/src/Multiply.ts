import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import BaseOperation from "./BaseOperation";

/**
 * Represent the multiplication operation as a math node.
 */
export default class Multiply extends BaseOperation {

    /**
     * @param {MathNode} left The left node.
     * @param {MathNode} right The right node.
     */
    constructor(left: MathNode, right: MathNode) {
        super(left, right, MathNodeType.Multiply, "*");
    }

    /**
     * @inheritDoc
     */
    concreteNext(): MathNode {
        if (!this.left.isAtomic || !this.right.isAtomic) {
            const [leftNode, rightNode] = super.getConstantsFromParenthesis();

            if(leftNode instanceof Constant && rightNode instanceof Constant) {
                return new Constant(leftNode.value * rightNode.value);
            }

            const nextLeft = this.left.next();
            const nextRight = this.right.next();

            if(!this.left.isEqual(nextLeft) || !this.right.isEqual(nextRight)) {
                return new Multiply(nextLeft, nextRight);
            }
        }

        return this;
    };

    /**
     * Return the multiplication of left and right.
     *
     * @param {number} left The left operand.
     * @param {number} right The right operand.
     * @returns {number} The multiplication result.
     */
    operation(left: number, right: number): number {
        return left * right;
    }
}
