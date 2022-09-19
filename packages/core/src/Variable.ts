import MathNode, { MathNodeType } from "./MathNode";
import Fraction from "./Fraction";
import Constant from "./Constant";


/**
 * Represent fractions as math node.
 */
export default class Variable extends MathNode {
    type = MathNodeType.Variable;
    isAtomic = false;

    /**
     * @param {string} name The variable name.
     */
    constructor(public name: string) {
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
        return new Fraction(new Constant(1), this);
    };

    /**
     * @inheritDoc
     */
    toJson() {
        return {
            type: this.type,
            name: this.name,
        };
    };

    /**
     * @inheritDoc
     */
    toString() {
        return `${this.name}`;
    };

    /**
     * @inheritDoc
     */
    toTex() {
        return `${this.name}`;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.name === mathNode.name;
    }
}
