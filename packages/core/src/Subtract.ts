import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";
import Add from "./Add";

/**
 * Represent the subtraction operation as a math node.
 */
export default class Subtract extends MathNode {
    type = MathNodeType.Subtract;

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
            return new Subtract(this.left.next(), this.right.next());
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
        return `${left} - ${right}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} - ${right}`;
    };
}
