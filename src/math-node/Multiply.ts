import MathNode, {MathNodeType, ToStringParam} from "./MathNode";
import Constant from "./Constant";
import Fraction from "./Fraction";


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

    next: () => MathNode = () => {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.left.value * this.right.value);
        } else if (this.left instanceof Fraction && this.right instanceof Fraction) {
            return (this.left as Fraction).multiply(this.right as Fraction);
        } else if (this.left instanceof Fraction && this.right instanceof Constant) {
            if (!this.left.isAtomic) {
                return new Multiply(this.left.next(), this.right);
            }
            return new Multiply(this.left, new Fraction(this.right, new Constant(1)));
        } else if (this.left instanceof Constant && this.right instanceof Fraction) {
            if (!this.right.isAtomic) {
                return new Multiply(this.left, this.right.next());
            }
            return new Multiply(new Fraction(this.left, new Constant(1)), this.right);
        } else if (!this.left.isAtomic || !this.right.isAtomic) {
            return new Multiply(this.left.next(), this.right.next());
        }

        return this;
    };

    toNode = () => {
        return {
            type: this.type,
            left: this.left.toNode(),
            right: this.right.toNode()
        };
    };

    toString = (data?: ToStringParam) => {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} * ${right}`;
    };

    toTex = (data?: ToStringParam) => {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} * ${right}`;
    };
}
