import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";

/**
 * Represent the Addition operation as a math node.
 */
export default class Negative extends MathNode {
    type = MathNodeType.Negative;
    isAtomic = false;

    content: MathNode;


    /**
     * @param {MathNode} content - The negative node.
     */
    constructor(content: MathNode) {
        super();
        this.content = content;
    }

    /**
     * @inheritDoc
     */
    next() {
        if(this.content instanceof Constant) {
            return new Constant(-this.content.value);
        }

        const next = this.content.next({ isNegative: true });

        if(next instanceof Constant) {
            return new Constant(-next.value);
        }

        return new Negative(next);
    };

    /**
     * @inheritDoc
     */
    toJson() {
        return {
            type: this.type,
            content: this.content.toJson(),
        };
    };

    /**
     * @inheritDoc
     */
    toString() {
        return `-${this.content.toString()}`;
    };

    /**
     * @inheritDoc
     */
    toTex() {
        return `-${this.content.toTex()} `;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.content.isEqual(mathNode.content);
    }
}
