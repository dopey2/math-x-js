import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import BaseOperation from "./BaseOperation";
import { Parenthesis } from "./index";

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
    next(): MathNode {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.left.value / this.right.value);
            // @ts-ignore
        } else if (this.left.divide) {
            // @ts-ignore
            return this.left.divide(this.right);
            // @ts-ignore
        } else if (this.right.divide) {
            // @ts-ignore
            return this.right.divide(this.left);
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
                return new Constant(leftNode.value / rightNode.value);
            }


            return new Divide(this.left.next(), this.right.next());
        }


        return this;
    };
}
