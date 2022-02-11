import MathNode, { MathNodeType } from "./MathNode";
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
        if (this.left.constant && this.right.constant) {
            return new Constant(this.left.constant.value * this.right.constant.value);
        } else if (this.left.fraction && this.right.fraction) {
            return (this.left as Fraction).multiply(this.right as Fraction);
        } else if (this.left.fraction && this.right.constant) {
            if (!this.left.atomic) {
                return new Multiply(this.left.next(), this.right);
            }
            return new Multiply(this.left, new Fraction(this.right, new Constant(1)));
        } else if (this.left.constant && this.right.fraction) {
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
            multiply: [],
        };
    };

    toString = () => {
        return `${this.left.toString()} * ${this.right.toString({ constant: { showNegativeInParenthesis: true } })}`;
    };

    toTex = (data?: {
        constant?: {
            showSign?: boolean,
            negativeOnly?: boolean,
            positiveOnly?: boolean,
            hideSign?: boolean,
            showNegativeInParenthesis?: boolean,
        }
    }) => {
        const left = this.left.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} * ${right}`;
    };
}
