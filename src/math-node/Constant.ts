import MathNode, { MathNodeType, ToStringParam } from "./MathNode";
import Fraction, { ToFraction } from "./Fraction";

export default class Constant extends MathNode implements ToFraction {
    type = MathNodeType.Constant;
    isAtomic = true;

    public override value: number;
    private readonly sign: string;

    constructor(value: number) {
        super();

        this.value = value;
        this.sign = value > 0 ? '+' : '-';
    }

    public next: () => MathNode = () => {
        return this as MathNode;
    };

    public toNode = () => {
        return {
            type: this.type,
            value: this.value,
        };
    };

    public toString = (data?: ToStringParam) => {
        if (data?.isAfterOperator && this.value < 0) {
            return `(${this.value})`;
        }

        return `${this.value}`;
    };

    public toTex = (data?: ToStringParam) => {
        return this.toString(data);
    };

    public toFraction() {
        return new Fraction(this as MathNode, new Constant(1));
    }
}