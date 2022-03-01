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
        if (this.content instanceof Constant) {
            return new Constant(-this.content.value);
        }

        return new Negative(this.content.next());
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
        const content = this.content.toString({ isAfterOperator: true });
        return `-(${content}) `;
    };

    /**
     * @inheritDoc
     */
    toTex() {
        const content = this.content.toTex({ isAfterOperator: true });
        return `- ${content} `;
    };

    /**
     * @inheritDoc
     */
    isEqual(mathNode: MathNode): boolean {
        // @ts-ignore
        return this.type === mathNode.type && this.content.isEqual(mathNode.content);
    }
}
