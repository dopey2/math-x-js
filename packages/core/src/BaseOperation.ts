import MathNode, { MathNodeType, ToStringParam } from "./MathNode";

/**
 * The base class for [addition, subtraction, multiplication, division].
 */
export default abstract class BaseOperation extends MathNode {
    public type: MathNodeType;
    public isAtomic = false;

    public left: MathNode;
    public right: MathNode;

    private readonly symbol!: string;


    /**
     * @param {MathNode} left - The left node.
     * @param {MathNode} right - The right node.
     * @param {MathNodeType} type - The node type.
     * @param {string} symbol - The symbol of the operator.
     */
    constructor(left: MathNode, right: MathNode, type: MathNodeType, symbol: string) {
        super();
        this.left = left;
        this.right = right;

        this.type = type;
        this.symbol = symbol;
    }

    /**
     * @inheritDoc
     */
    toJson() {
        return {
            type: this.type,
            left: this.left.toJson(),
            right: this.right.toJson(),
        };
    };

    /**
     * @inheritDoc
     */
    toString(data?: ToStringParam) {
        const left = this.left.toString({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toString({ isAfterOperator: true });
        return `${left} ${this.symbol} ${right}`;
    };

    /**
     * @inheritDoc
     */
    toTex(data?: ToStringParam) {
        const left = this.left.toTex({ isAfterOperator: data?.isAfterOperator });
        const right = this.right.toTex({ isAfterOperator: true });
        return `${left} ${this.symbol} ${right}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-expect-error
        return this instanceof MathNode && this.right.isEqual(mathNode.right) && this.left.isEqual(mathNode.left);
    }

    /**
     * @inheritDoc
     */
    public abstract next(args?: { isNegative?: boolean }): MathNode;
}
