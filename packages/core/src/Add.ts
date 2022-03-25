import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import Subtract from "./Subtract";
import BaseOperation from "./BaseOperation";

/**
 * Represent the Addition operation as a math node.
 */
export default class Add extends BaseOperation {

    /**
     * @param {MathNode} left - The left node.
     * @param {MathNode} right - The right node.
     */
    constructor(left: MathNode, right: MathNode) {
        super(left, right, MathNodeType.Add, "+");
    }

    /**
     * @inheritDoc
     */
    next(): MathNode {
        const mathNode = super.baseNext();

        if(mathNode) {
            return mathNode;
        }

        if (!this.left.isAtomic || !this.right.isAtomic) {
            const [leftNode, rightNode] = super.getConstantsFromParenthesis();

            if(leftNode instanceof Constant && rightNode instanceof Constant) {
                if(rightNode.value < 0) {
                    return new Subtract(leftNode, new Constant(Math.abs(rightNode.value)));
                }

                return new Constant(leftNode.value + rightNode.value);
            }

            return new Add(this.left.next(), this.right.next());
        }

        return this;
    };

    /**
     * Return the addition of left and right. 
     * 
     * @param {number} left The left operand.
     * @param {number} right The right operand.
     * @returns {number} The addition result.
     */
    operation(left: number, right: number): number {
        return left + right;
    }
}
