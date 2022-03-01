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

        // todo remove this, put inside parser

        if(this.left.value !== this.left.value && this.right instanceof Constant) {
            // @ts-ignore
            return new Constant(-this.right.value);
        }
        
    }

    /**
     * @inheritDoc
     */
    next() {
        if(this.left.value !== this.left.value) {
            if(this.right instanceof Constant) {
                return new Constant(-this.right.value);
            } else if(!this.right.isAtomic) {
                const next = this.right.next({ isNegative: true });
                if(next instanceof Constant) {
                    return new Constant(-next.value);
                }

                return new Subtract(this.left, next);
            }
        }

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
        
        if(this.left instanceof Constant && this.left.value !== this.left.value) {
            if(this.right instanceof Constant) {
                return `-${this.right.toString()}`;
            }

            return `-${this.right}`;
        }
        
        return `${left} - ${right}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const left = this.left.toTex({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toTex({ isAfterOperator: true });
        return `${left} - ${right}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.right.isEqual(mathNode.right) && this.left.isEqual(mathNode.left);
    }
}
