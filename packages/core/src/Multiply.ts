import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";
import { Parenthesis } from "./index";


/**
 * Represent the multiplication operation as a math node.
 */
export default class Multiply extends MathNode {
    type = MathNodeType.Multiply;

    left: MathNode;
    right: MathNode;

    isAtomic = false;

    /**
     * @param {MathNode} left The left node.
     * @param {MathNode} right The right node.
     */
    constructor(left: MathNode, right: MathNode) {
        super();
        this.left = left;
        this.right = right;
    }

    /**
     * @inheritDoc
     */
    next(): MathNode {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.left.value * this.right.value);
            // @ts-ignore
        } else if (this.left.multiply) {
            // @ts-ignore
            return this.left.multiply(this.right);
            // @ts-ignore
        } else if (this.right.multiply) {
            // @ts-ignore
            return this.right.multiply(this.left);
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
                return new Constant(leftNode.value * rightNode.value);
            }

        
            return new Multiply(this.left.next(), this.right.next());
        }
        

        return this;
    };

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
        return `${left} * ${right}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const left = this.left.toTex({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toTex({ isAfterOperator: true });
        return `${left} * ${right}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.right.isEqual(mathNode.right) && this.left.isEqual(mathNode.left);
    }
}
