import MathNode, {MathNodeType, ToStringParam} from "./MathNode";
import Constant from "./Constant";
import Fraction from "./Fraction";


export default class Multiply extends MathNode {
    type = MathNodeType.multiply;

    left: MathNode;
    right: MathNode;

    atomic = false;

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
            if (!this.left.atomic) {
                return new Multiply(this.left.next(), this.right);
            }
            return new Multiply(this.left, new Fraction(this.right, new Constant(1)));
        } else if (this.left instanceof Constant && this.right instanceof Fraction) {
            if (!this.right.atomic) {
                return new Multiply(this.left, this.right.next());
            }
            return new Multiply(new Fraction(this.left, new Constant(1)), this.right);
        } else if (!this.left.atomic || !this.right.atomic) {
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
        const left = this.left.toString({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toString({ constant: { showNegativeInParenthesis: true } });
        return `${left} * ${right}`;
    };

    toTex = (data?: ToStringParam) => {
        const left = this.left.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} * ${right}`;
    };
}
