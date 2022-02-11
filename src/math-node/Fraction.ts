import MathNode, { MathNodeType } from "./MathNode";
import Constant from "./Constant";
import Add from "./Add";
import Multiply from "./Multiply";
import Subtract from "./Subtract";
import Utils from "../utils";


export interface ToFraction {
    toFraction: () => Fraction;
}

export interface FractionData {
    n: MathNode; // numerator up
    d: MathNode; // denominator -> down
}

export default class Fraction extends MathNode implements ToFraction {
    type = MathNodeType.fraction;
    atomic = false;

    fraction: FractionData;

    constructor(n: MathNode, d: MathNode) {
        super();

        this.fraction = {
            n,
            d,
        };

        if (this.fraction.n.constant && this.fraction.d.constant) {
            const numerator = this.fraction.n.constant.value;
            const denominator = this.fraction.d.constant.value;
            const mod = numerator % denominator;

            this.atomic = mod !== 0;
        }
    }

    solveForConstant(n: Constant, d: Constant) {
        const numerator = n.constant.value;
        const denominator = d.constant.value;
        const quotient = numerator / denominator;

        if (quotient === Math.floor(quotient)) {
            return new Constant(quotient);
        } else {
            // @ts-ignore
            return new Fraction(n as MathNode, d as MathNode);
        }
    }

    // @ts-ignore
    next = () => {
        if (this.fraction.n.constant && this.fraction.d.constant) {
            return this.solveForConstant(this.fraction.n as Constant, this.fraction.d as Constant);
        }


        return new Fraction(this.fraction.n.next(), this.fraction.d.next()) as MathNode;
    };

    // @ts-ignore
    solveDenominatorForConstants = (fractionA: Fraction, fractionB: Fraction) => {
        if (fractionA.fraction.d.constant && fractionB.fraction.d.constant) {
            const dA = fractionA.fraction.d.constant?.value;
            const dB = fractionB.fraction.d.constant?.value;

            const lcm = Utils.lcm(dA, dB);
            const kA = lcm / dA;
            const kB = lcm / dB;

            // @ts-ignore
            const expression_nA = kA === 1
                ? fractionA.fraction.n
                : new Multiply(fractionA.fraction.n, new Constant(kA) as MathNode) as MathNode;

            const expression_nB = kB === 1
                ? fractionB.fraction.n
                : new Multiply(fractionB.fraction.n, new Constant(kB) as MathNode) as MathNode;

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


    add(fraction: Fraction) {
        if (this.fraction.d.constant && fraction.fraction.d.constant) {
            if (this.fraction.d.constant.value === fraction.fraction.d.constant.value) {
                const addNumerator = new Add(this.fraction.n, fraction.fraction.n);
                return new Fraction(addNumerator, this.fraction.d);
            } else {
                const [fractionA, fractionB] = this.solveDenominatorForConstants(this, fraction);
                return new Add(fractionA, fractionB);
            }
        }

        return new Add(this.next(), fraction.next());
    }

    subtract = (fraction: Fraction) => {
        if (this.fraction.d.constant && fraction.fraction.d.constant) {
            if (this.fraction.d.constant.value === fraction.fraction.d.constant.value) {
                const subtractNumerator = new Subtract(this.fraction.n, fraction.fraction.n);
                return new Fraction(subtractNumerator, this.fraction.d);
            } else {
                const [fractionA, fractionB] = this.solveDenominatorForConstants(this, fraction);
                return new Subtract(fractionA, fractionB);
            }
        }

        return new Subtract(this.next(), fraction.next());
    };


    multiply = (fraction: Fraction) => {
        if (this.fraction.d.constant && fraction.fraction && fraction.fraction.d.constant) {
            return new Fraction(
                new Multiply(this.fraction.n, fraction.fraction.n) as MathNode,
                new Multiply(this.fraction.d, fraction.fraction.d) as MathNode
            );
        }

        return new Multiply(this.next(), fraction.next());
    };

    multiplyByConstant = (c: Constant) => {
        return new Fraction(
            new Multiply(this.fraction.n, c as MathNode) as MathNode,
            new Multiply(this.fraction.d, c as MathNode) as MathNode
        );
    };

    toFraction = () => {
        return this;
    };

    toString = () => {
        return `${this.fraction.n.toString()} / ${this.fraction.d.toString()}`;
    };

    toTex = () => {
        return `\\fraction{${this.fraction.n.toTex()}}{${this.fraction.d.toTex()}}`;
    };
}
