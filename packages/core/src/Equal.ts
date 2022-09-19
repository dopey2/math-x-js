import MathNode, { MathNodeType } from "./MathNode";


/**
 * Represent fractions as math node.
 */
export default class Equal extends MathNode {
    type = MathNodeType.Equal;

    /**
     * A fraction is considered as atomic if its results is a Floating number eg: 5 / 3.
     */
    isAtomic = false;

    /**
     * @param {MathNode} left The left operands.
     * @param {MathNode} right The right operands.
     */
    constructor(public left: MathNode, public right: MathNode) {
        super();
    }

    /**
     * @inheritDoc
     */
    next(): MathNode {
        return this;
    };

    /**
     * @inheritDoc
     */
    toFraction() {
        return this;
    };

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
    toString() {
        return `${this.left.toString()} = ${this.right.toString()}`;
    };

    /**
     * @inheritDoc
     */
    toTex() {
        return `${this.left.toTex()} = ${this.right.toTex()}}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.left.isEqual(mathNode.left) && this.right.isEqual(mathNode.right);
    }
}
