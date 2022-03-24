import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import Add from "./Add";
import BaseOperation from "./BaseOperation";
import { Parenthesis } from "./index";

/**
 * Represent the subtraction operation as a math node.
 */
export default class Subtract extends BaseOperation {

    /**
     * @param {MathNode} left The left node.
     * @param {MathNode} right The right node.
     */
    constructor(left: MathNode, right: MathNode) {
        super(left, right, MathNodeType.Subtract, "-");
    }

    /**
     * @inheritDoc
     */
    next() {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            if (this.right.value < 0) {
                return new Add(this.left, new Constant(Math.abs(this.right.value)));
            }

            return new Constant(this.left.value - Math.abs(this.right.value)) as MathNode;
            // @ts-ignore
        } else if(this.left.subtract) {
            // @ts-ignore
            return this.left.subtract(this.right);
            // @ts-ignore
        } else if(this.right.subtract) {
            // @ts-ignore
            return this.right.subtract(this.left);
        }

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
                if(rightNode.value < 0) {
                    return new Add(leftNode, new Constant(Math.abs(rightNode.value)));
                }

                return new Constant(leftNode.value - rightNode.value);
            }


            return new Subtract(this.left.next(), this.right.next());
        }

        return this;
    };
}
