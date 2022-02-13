import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";
import Subtract from "./Subtract";


export default class Add extends MathNode {
    type = MathNodeType.Add;

    left: MathNode;
    right: MathNode;

    isAtomic = false;

    constructor(left: MathNode, right: MathNode) {
        super();
        this.left = left;
        this.right = right;

        if (this.right.value !== null && this.right.value < 0) {
            return new Subtract(this.left, new Constant(Math.abs(this.right.value)));
        }
    }

    next() {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.left.value + this.right.value);
            // @ts-ignore
        } else if(this.left.add) {
            // @ts-ignore
            return this.left.add(this.right);
            // @ts-ignore
        } else if(this.right.add) {
            // @ts-ignore
            return this.right.add(this.left);
        }

        if (!this.left.isAtomic || !this.right.isAtomic) {
            return new Add(this.left.next(), this.right.next());
        }

        return this;
    };

    toNode() {
        return {
            type: this.type,
            left: this.left.toNode(),
            right: this.right.toNode(),
        };
    };

    toString(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} + ${right}`;
    };

    toTex(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} + ${right}`;
    };
}
