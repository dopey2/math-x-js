import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Constant from "./Constant";


/**
 * Represent the exponentiation operation as a math node.
 */
export default class Exponent extends MathNode {
    type = MathNodeType.Exponent;

    base: MathNode;
    exponent: MathNode;

    isAtomic = false;

    /**
     * @param {MathNode} base The base.
     * @param {MathNode} exponent The exponent.
     */
    constructor(base: MathNode, exponent: MathNode) {
        super();

        this.base = base;
        this.exponent = exponent;
    }

    /**
     * @inheritDoc
     */
    next() {
        if (this.base instanceof Constant && this.exponent instanceof Constant) {
            return new Constant(this.base.value ** this.exponent.value);
        } else if (!this.base.isAtomic || !this.exponent.isAtomic) {
            return new Exponent(this.base.next(), this.exponent.next());
        }

        return this;
    };

    /**
     * @inheritDoc
     */
    toJson() {
        return {
            type: this.type,
            base: this.base.toJson(),
            exponent: this.exponent.toJson(),
        };
    };

    /**
     * @inheritDoc
     */
    toString(data?: ToStringParam) {
        const base = this.base.toString({ isAfterOperator: data?.isAfterOperator });
        const expo = this.exponent.toString();
        return `${base}^{${expo}}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const base = this.base.toTex({ isAfterOperator: data?.isAfterOperator });
        const expo = this.exponent.toTex();
        return `${base}^{${expo}}`;
    };


    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        return (
            this.type === mathNode.type
            // @ts-ignore
            && this.base.isEqual(mathNode.base)
            // @ts-ignore
            && this.exponent.isEqual(mathNode.exponent)
        );
    }
}
