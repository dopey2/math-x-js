import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";


export default class Parenthesis extends MathNode {
    type = MathNodeType.Add;
    isAtomic = false;

    private readonly content: MathNode;

    constructor(content: MathNode) {
        super();
        this.content = content;
    }

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

    toJson() {
        return {
            type: this.type,
            content: this.content.toJson(),
        };
    };

    toString() {
        return `(${this.content.toString()})`;
    };

    toTex() {
        return `(${this.content.toTex()})`;
    };
}
