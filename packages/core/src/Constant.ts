import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Fraction, { ToFraction } from "./Fraction";

/**
 * Math node for representing a constant value.
 */
export default class Constant extends MathNode implements ToFraction {
    type = MathNodeType.Constant;
    isAtomic = true;

    public override value: number;

    /**
     * @param {number} value The value of the constant.
     */
    constructor(value: number) {
        super();
        this.value = value;

        /**
         * When value === -0 set value to 0.
         */
        if(value === 0) {
            this.value = 0;
        }
    }

    /**
     * @inheritDoc
     */
    public next() {
        return this;
    };

    /**
     * @inheritDoc
     */
    public toJson() {
        return {
            type: this.type,
            value: this.value,
        };
    };

    /**
     * @inheritDoc
     */
    public toString(data?: ToStringParam) {
        if (data?.isAfterOperator && this.value < 0) {
            return `(${this.value})`;
        }

        return `${this.value}`;
    };

    /**
     * @inheritDoc
     */
    public toTex(data?: ToStringParam) {
        return this.toString(data);
    };

    /**
     * @inheritDoc
     */
    public toFraction() {
        return new Fraction(this as MathNode, new Constant(1));
    }

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return mathNode && this.type === mathNode.type && this.value === mathNode.value;
    }
}
