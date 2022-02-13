import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";

export interface ParenthesisData {
  operation: MathNode
}

export default class Parenthesis extends MathNode {
    type = MathNodeType.Add;
  
    isAtomic = false;

    content: MathNode;

    constructor(content: MathNode) {
        super();
        this.content = content
    }

    next: () => MathNode = () => {
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

    toNode = () =>  {
        return {
            type: this.type,
            content: this.content.toNode(),
        };
    }

    toString = () => {
        return `(${this.content.toString()})`;
    };

    toTex = () => {
        return `(${this.content.toTex()})`;
    };
}
