import MathNode, { MathNodeType } from "./MathNode";

export interface ParenthesisData {
  operation: MathNode
}

export default class Parenthesis extends MathNode {
    type = MathNodeType.add;
  
    atomic = false;
    parenthesis: ParenthesisData;

    constructor(operation: MathNode) {
        super();
      
        this.parenthesis = {
            operation: operation,
        };
    }

    next: () => MathNode = () => {
        if(this.parenthesis.operation.constant) {
            return this.parenthesis.operation;
        } else {
            const solvedParenthesis = this.parenthesis.operation.next();
            if(solvedParenthesis.constant) {
                return solvedParenthesis;
            }
            return new Parenthesis(solvedParenthesis);
        }
    };

    toNode() {
        return {
            add: [],
        };
    }

    toString = () => {
        return `(${this.parenthesis.operation.toString()})`;
    };

    toTex = () => {
        return `(${this.parenthesis.operation.toTex()})`;
    };
}
