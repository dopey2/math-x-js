import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";


export default class Exponent extends MathNode {
    type = MathNodeType.Exponent;

    base: MathNode;
    exponent: MathNode;

    isAtomic = false;

    constructor(base: MathNode, exponent: MathNode) {
        super();

        this.base = base;
        this.exponent = exponent;
    }

    next() {
        if (this.base instanceof Constant && this.exponent instanceof Constant) {
            return new Constant(this.base.value ** this.exponent.value);
        } else if (!this.base.isAtomic || !this.exponent.isAtomic) {
            return new Exponent(this.base.next(), this.exponent.next());
        }

        return this;
    };

    toJson() {
        return {
            type: this.type,
            base: this.base.toJson(),
            exponent: this.exponent.toJson(),
        };
    };

    toString(data?: ToStringParam) {
        const base = this.base.toString({ isAfterOperator: data?.isAfterOperator });
        const expo = this.exponent.toString();
        return `${base}^{${expo}}`;
    };

    toTex(data?: ToStringParam) {
        const base = this.base.toString({ isAfterOperator: data?.isAfterOperator });
        const expo = this.exponent.toTex();
        return `${base}^{${expo}}`;
    };
}
