import MathNode, { MathNodeType } from "./MathNode";
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

    private readonly n: MathNode; // numerator up
    private readonly d: MathNode; // denominator -> down

    constructor(n: MathNode, d: MathNode) {
        super();

        this.n = n;
        this.d = d;

        if (this.n instanceof Constant && this.d instanceof Constant) {
            const NUMERATOR = this.n.value;
            const DENOMINATOR = this.d.value;
            const MODULO = NUMERATOR % DENOMINATOR;
            this.isAtomic = MODULO !== 0;
        }
    }

    private solveForConstant(n: Constant, d: Constant) {
        const NUMERATOR = n.value;
        const DENOMINATOR = d.value;
        const QUOTIENT = NUMERATOR / DENOMINATOR;

        if (QUOTIENT === Math.floor(QUOTIENT)) {
            return new Constant(QUOTIENT);
        } else {
            return new Fraction(n as MathNode, d as MathNode);
        }
    }

    next(): MathNode {
        if (this.n instanceof Constant && this.d instanceof Constant) {
            return this.solveForConstant(this.n as Constant, this.d as Constant);
        }

        return new Fraction(this.n.next(), this.d.next());
    };

    toJson() {
        return {
            type: this.type,
            numerator: this.n.toJson(),
            denominator: this.d.toJson(),
        };
    };

    private solveDenominatorForConstants(fractionA: Fraction, fractionB: Fraction) {
        if (fractionA.d instanceof Constant && fractionB.d instanceof Constant) {
            const DENOMINATOR_A = fractionA.d.value;
            const DENOMINATOR_B = fractionB.d.value;

            const LCM = Utils.lcm(DENOMINATOR_A, DENOMINATOR_B);
            const COMMON_A = LCM / DENOMINATOR_A;
            const COMMON_B = LCM / DENOMINATOR_B;

            const numeratorA = COMMON_A === 1
                ? fractionA.n
                : new Multiply(fractionA.n, new Constant(COMMON_A) as MathNode) as MathNode;

            const numeratorB = COMMON_B === 1
                ? fractionB.n
                : new Multiply(fractionB.n, new Constant(COMMON_B) as MathNode) as MathNode;

            const denominatorA = COMMON_A === 1
                ? new Constant(DENOMINATOR_A)
                : new Multiply(new Constant(DENOMINATOR_A) as MathNode, new Constant(COMMON_A) as MathNode) as MathNode;

            const denominatorB = COMMON_B === 1
                ? new Constant(DENOMINATOR_B)
                : new Multiply(new Constant(DENOMINATOR_B) as MathNode, new Constant(COMMON_B) as MathNode) as MathNode;

            return [
                new Fraction(numeratorA, denominatorA),
                new Fraction(numeratorB, denominatorB)
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
                    return new Add(next, argument);
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

    subtract(constant: Constant): MathNode;
    subtract(fraction: Fraction): MathNode;
    subtract(argument: Constant | Fraction) {
        if(argument instanceof Constant) {
            if(this.n instanceof Constant && this.d instanceof Constant) {
                const next = this.solveForConstant(this.n, this.d);
                if(next instanceof Constant) {
                    return new Subtract(next, argument);
                }
            }
            return new Subtract(this, argument.toFraction());
        } else {

            if (this.d instanceof Constant && argument.d instanceof Constant) {
                if (this.d.value === argument.d.value) {
                    const subtractNumerator = new Subtract(this.n, argument.n);
                    return new Fraction(subtractNumerator, this.d);
                } else {
                    const [fractionA, fractionB] = this.solveDenominatorForConstants(this, argument);
                    return new Subtract(fractionA, fractionB);
                }
            }

        }

        return new Subtract(this.next(), argument.next());
    };


    multiply(constant: Constant): MathNode;
    multiply(fraction: Fraction): MathNode;
    multiply(argument: Constant | Fraction): MathNode {
        
        if(argument instanceof Constant) {
            if(this.n instanceof Constant && this.d instanceof Constant) {
                const next = this.solveForConstant(this.n, this.d);
                if(next instanceof Constant) {
                    return new Multiply(next, argument);
                }
            }
           
            return new Fraction(
                new Multiply(this.n, argument),
                new Multiply(this.d, argument)
            );
        }
         
        if (this.d && argument && argument.d) {
            return new Fraction(
                    new Multiply(this.n, argument.n) as MathNode,
                    new Multiply(this.d, argument.d) as MathNode
            );
        }
        
        return new Multiply(this.next(), argument.next());
    };

    public getNumerator(): MathNode {
        return this.n;
    }

    public getDenominator(): MathNode {
        return this.d;
    }

    toFraction() {
        return this;
    };

    toString() {
        return `{${this.n.toString()}} / {${this.d.toString()}}`;
    };

    toTex() {
        return `\\fraction{${this.n.toTex()}}{${this.d.toTex()}}`;
    };
}
