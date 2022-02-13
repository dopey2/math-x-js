import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";


export default class Multiply extends MathNode {
    type = MathNodeType.Multiply;

    left: MathNode;
    right: MathNode;

    isAtomic = false;

    constructor(left: MathNode, right: MathNode) {
        super();
        this.left = left;
        this.right = right;
    }

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
        } else if (!this.left.isAtomic || !this.right.isAtomic) {
            return new Multiply(this.left.next(), this.right.next());
        }

        return this;
    };

    toJson() {
        return {
            type: this.type,
            left: this.left.toJson(),
            right: this.right.toJson(),
        };
    };

    toString(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} * ${right}`;
    };

    toTex(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} * ${right}`;
    };
}
