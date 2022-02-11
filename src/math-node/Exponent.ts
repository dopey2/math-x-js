import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";


export default class Exponent extends MathNode {
    type = MathNodeType.add;

    base: MathNode;
    exponent: MathNode;

    atomic = false;

    constructor(base: MathNode, exponent: MathNode) {
        super();

        this.base = base;
        this.exponent = exponent;
    }

    next: () => MathNode = () => {
        if (this.base.constant && this.exponent.constant) {
            return new Constant(this.base.constant.value ** this.exponent.constant.value);
        } else if (!this.base.atomic || !this.exponent.atomic) {
            return new Exponent(this.base.next(), this.exponent.next());
        }

        return this;
    };

    toNode() {
        return {
            exponent: [],
        };
    }

    toString = () => {
        return `${this.base.toString()} + ${this.exponent.toString()}`;
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
        const base = this.base.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const exponent = this.exponent.toTex();
        return `${base}^{${exponent}}`;
    };
}
