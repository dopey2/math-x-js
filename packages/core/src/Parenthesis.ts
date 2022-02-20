import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";

/**
 * Represent the parenthesis as a math node.
 */
export default class Parenthesis extends MathNode {
    type = MathNodeType.Parenthesis;
    isAtomic = false;

    private readonly content: MathNode;

    /**
     * @param {MathNode} content The content of the parenthesis.
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
            return this.content;
        } else {
            const solvedParenthesis = this.content.next();
            if(solvedParenthesis instanceof Constant) {
                return solvedParenthesis;
            }
            return new Parenthesis(solvedParenthesis);
        }
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
        return `(${this.content.toString()})`;
    };

    /**
     * @inheritDoc
     */
    toTex() {
        return `(${this.content.toTex()})`;
    };
}
