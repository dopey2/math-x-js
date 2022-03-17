import { binding, given,when, then } from "cucumber-tsflow";
import { MathNode } from "@math-x-ts/core/src";
import { parse } from '../../../parser/src';


const assert = require('assert');


@binding()
export default class StepByStep {

    private expression!: string;
    private mathNode!: MathNode;
    private steps: MathNode[] = [];

    @given("the expression {string}")
    public givenAnExpression(expression: string) {
        this.expression = expression;
    }

    @when("all steps are solved")
    public whenParsed() {
        this.mathNode = parse(this.expression);
        this.steps = this.mathNode.solveAll();
    }

    @then("step {int} should be {string}")
    public checkStep(step: number, result: string) {
        assert.strictEqual(this.steps[step].toString(), result);
    }

    @then("step {int} should be atomic")
    public checkLastStepIsAtomic(step: number) {
        assert.strictEqual(this.steps[step].isAtomic, true);
        assert.strictEqual(this.steps[step + 1], undefined);
    }
}

