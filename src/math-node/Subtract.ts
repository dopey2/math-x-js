import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import Fraction from "./Fraction";
import Add from "./Add";

export default class Subtract extends MathNode {
    type = MathNodeType.subtract;

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
            if (this.right.constant.value < 0) {
                return new Add(this.left, new Constant(Math.abs(this.right.constant.value)));
            }
            return new Constant(this.left.constant.value - Math.abs(this.right.constant.value)) as MathNode;
        } else if (this.left.fraction && this.right.fraction) {
            return (this.left as Fraction).subtract(this.right as Fraction) as MathNode;
        } else if (this.left.fraction && this.right.constant) {
            return new Subtract(this.left, (this.right as Constant).toFraction() as MathNode) as MathNode;
        } else if (this.left.constant && this.right.fraction) {
            return new Subtract((this.left as Constant).toFraction() as MathNode, this.right) as MathNode;
        } else if (!this.left.atomic || !this.right.atomic) {
            return new Subtract(this.left.next(), this.right.next());
        }

        return this;
    };


    toNode() {
        return {
            add: [],
        };
    }

    toString = () => {
        const left = this.left.toTex({ constant: { negativeOnly: true } });
        const right = this.right.toTex({ constant: { hideSign: true } });
        return `${left} - ${right}`;
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
        const left = this.left.toTex({ constant: { negativeOnly: true, showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} - ${right}`;
    };
}
