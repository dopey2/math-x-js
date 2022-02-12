import MathNode, {MathNodeType, ToStringParam} from "./MathNode";
import Constant from "./Constant";
import Fraction from "./Fraction";
import Add from "./Add";

export default class Subtract extends MathNode {
    type = MathNodeType.subtract;

    left: MathNode;
    right: MathNode;

    atomic = false;

    constructor(left: MathNode, right: MathNode) {
        super();
        this.left = left;
        this.right = right;
    }

    next: () => MathNode = () => {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            if (this.right.value < 0) {
                return new Add(this.left, new Constant(Math.abs(this.right.value)));
            }
            return new Constant(this.left.value - Math.abs(this.right.value)) as MathNode;
            // @ts-ignore
        } else if(this.left.subtract) {
            // @ts-ignore
            return this.left.subtract(this.right)
            // @ts-ignore
        } else if(this.right.subtract) {
            // @ts-ignore
            return this.right.subtract(this.left);
        }

        if (!this.left.atomic || !this.right.atomic) {
            return new Subtract(this.left.next(), this.right.next());
        }

        return this;
    };

    toNode = () => {
        return {
            type: this.type,
            left: this.left.toNode(),
            right: this.right.toNode()
        };
    }
    
    toString = (data?: ToStringParam) => {
        const left = this.left.toString({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toString({ constant: { showNegativeInParenthesis: true } });
        return `${left} - ${right}`;
    };

    toTex = (data?: ToStringParam) => {
        const left = this.left.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} - ${right}`;
    };
}
