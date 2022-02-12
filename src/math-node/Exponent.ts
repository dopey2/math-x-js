import MathNode, {MathNodeType, ToStringParam} from "./MathNode";
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
        if (this.base instanceof Constant && this.exponent instanceof Constant) {
            return new Constant(this.base.value ** this.exponent.value);
        } else if (!this.base.atomic || !this.exponent.atomic) {
            return new Exponent(this.base.next(), this.exponent.next());
        }

        return this;
    };

    toNode = () => {
        return {
            type: this.type,
            base: this.base.toNode(),
            exponent: this.exponent.toNode(),
        };
    }

    toString = (data?: ToStringParam) => {
      const base = this.base.toString({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
      const exponent = this.exponent.toString();
      return `${base}^{${exponent}}`;
    };

    toTex = (data?: ToStringParam) => {
        const base = this.base.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const exponent = this.exponent.toTex();
        return `${base}^{${exponent}}`;
    };
}
