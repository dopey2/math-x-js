import MathNode, {MathNodeType} from "./MathNode";
import Constant from "./Constant";
import Add from "./Add";
import Multiply from "./Multiply";
import Subtract from "./Subtract";
import Utils from "../utils";


export interface ToFraction {
    toFraction: () => Fraction;
}

export default class Fraction extends MathNode implements ToFraction {
    type = MathNodeType.Fraction;

    /**
     * A fraction is considered as atomic if its results is a Floating number eg: 5 / 3
     */
    isAtomic = false;

    private n: MathNode; // numerator up
    private d: MathNode; // denominator -> down

    constructor(n: MathNode, d: MathNode) {
        super();

        this.n = n;
        this.d = d;

        if (this.n instanceof Constant && this.d instanceof Constant) {
            const numerator = this.n.value;
            const denominator = this.d.value;
            const mod = numerator % denominator;
            this.isAtomic = mod !== 0;
        }
    }

    private solveForConstant(n: Constant, d: Constant) {
        const numerator = n.value;
        const denominator = d.value;
        const quotient = numerator / denominator;

        if (quotient === Math.floor(quotient)) {
            return new Constant(quotient);
        } else {
            return new Fraction(n as MathNode, d as MathNode);
        }
    }

    // @ts-ignore
    next = () => {
        if (this.n instanceof Constant && this.d instanceof Constant) {
            return this.solveForConstant(this.n as Constant, this.d as Constant);
        }

        return new Fraction(this.n.next(), this.d.next()) as MathNode;
    };

    toNode = () => {
        return {
            type: this.type,
            numerator: this.n.toNode(),
            denominator: this.d.toNode(),
        }
    }

    // @ts-ignore
    private solveDenominatorForConstants = (fractionA: Fraction, fractionB: Fraction) => {
        if (fractionA.d instanceof Constant && fractionB.d instanceof Constant) {
            const dA = fractionA.d.value;
            const dB = fractionB.d.value;

            const lcm = Utils.lcm(dA, dB);
            const kA = lcm / dA;
            const kB = lcm / dB;

            // @ts-ignore
            const expression_nA = kA === 1
                ? fractionA.n
                : new Multiply(fractionA.n, new Constant(kA) as MathNode) as MathNode;

            const expression_nB = kB === 1
                ? fractionB.n
                : new Multiply(fractionB.n, new Constant(kB) as MathNode) as MathNode;

            const expression_dA = kA === 1
                ? new Constant(dA)
                : new Multiply(new Constant(dA) as MathNode, new Constant(kA) as MathNode) as MathNode;

            const expression_dB = kB === 1
                ? new Constant(dB)
                : new Multiply(new Constant(dB) as MathNode, new Constant(kB) as MathNode) as MathNode;

            return [
                new Fraction(expression_nA, expression_dA),
                new Fraction(expression_nB, expression_dB)
            ];
        }

        return [
            fractionA,
            fractionB
        ];
    };

    add(constant: Constant): MathNode;
    add(fraction: Fraction): MathNode;
    add(argument: Constant | Fraction) {
        if(argument instanceof Constant) {
            if(this.n instanceof Constant && this.d instanceof Constant) {
                const next = this.solveForConstant(this.n, this.d);
                if(next instanceof Constant) {
                    return new Add(next, argument)
                }
            }

            return new Add(this, argument.toFraction());
        } else {
            if (this.d instanceof Constant && argument.d instanceof Constant) {
                if (this.d.value === argument.d.value) {
                    const addNumerator = new Add(this.n, argument.n);
                    return new Fraction(addNumerator, this.d);
                } else {
                    const [fractionA, fractionB] = this.solveDenominatorForConstants(this, argument);
                    return new Add(fractionA, fractionB);
                }
            }
        }

        return new Add(this.next(), argument.next());
    }

    subtract = (fraction: Fraction) => {
        if (this.d instanceof Constant && fraction.d instanceof Constant) {
            if (this.d.value === fraction.d.value) {
                const subtractNumerator = new Subtract(this.n, fraction.n);
                return new Fraction(subtractNumerator, this.d);
            } else {
                const [fractionA, fractionB] = this.solveDenominatorForConstants(this, fraction);
                return new Subtract(fractionA, fractionB);
            }
        }

        return new Subtract(this.next(), fraction.next());
    };


    multiply = (fraction: Fraction) => {
        if (this.d && fraction && fraction.d) {
            return new Fraction(
                new Multiply(this.n, fraction.n) as MathNode,
                new Multiply(this.d, fraction.d) as MathNode
            );
        }

        return new Multiply(this.next(), fraction.next());
    };

    private multiplyByConstant = (c: Constant) => {
        return new Fraction(
            new Multiply(this.n, c as MathNode) as MathNode,
            new Multiply(this.d, c as MathNode) as MathNode
        );
    };

    public getNumerator(): MathNode {
        return this.n;
    }

    public getDenominator(): MathNode {
        return this.d;
    }

    toFraction = () => {
        return this;
    };

    toString = () => {
        return `{${this.n.toString()}} / {${this.d.toString()}}`;
    };

    toTex = () => {
        return `\\fraction{${this.n.toTex()}}{${this.d.toTex()}}`;
    };
}
