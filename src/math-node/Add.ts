import MathNode, {MathNodeType, ToStringParam} from "./MathNode";
import Constant from "./Constant";
import Subtract from "./Subtract";


export default class Add extends MathNode {
    type = MathNodeType.add;

    left: MathNode;
    right: MathNode;

    atomic = false;

    constructor(left: MathNode, right: MathNode) {
        super();
        this.left = left;
        this.right = right;

        if (this.right.value !== null && this.right.value < 0) {
            return new Subtract(this.left, new Constant(Math.abs(this.right.value)));
        }
    }

    next: () => MathNode = () => {
        if (this.left instanceof Constant && this.right instanceof Constant) {
            return new Constant(this.left.value + this.right.value);
            // @ts-ignore
        } else if(this.left.add) {
            // @ts-ignore
            return this.left.add(this.right)
            // @ts-ignore
        } else if(this.right.add) {
            // @ts-ignore
            return this.right.add(this.left);
        }

        if (!this.left.atomic || !this.right.atomic) {
            return new Add(this.left.next(), this.right.next());
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
        return `${left} + ${right}`;
    };

    toTex = (data?: ToStringParam) => {
        const left = this.left.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} + ${right}`;
    };
}
