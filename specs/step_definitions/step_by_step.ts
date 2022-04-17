import * as assert from 'assert';
import { binding, given,when, then } from "cucumber-tsflow";
import { MathNode } from "@math-x-ts/core/src";
import { parse, evaluate, solve } from '@math-x-ts/parser/src';


@binding()
export default class StepByStep {
    private expression!: string;
    private mathNode!: MathNode;
    private steps: MathNode[] = [];

    @given("the expression {string}")
    public givenAnExpression(expression: string) {
        this.expression = expression;
    }

    @when("the expression is parsed")
    public whenParsed() {
        this.mathNode = parse(this.expression);
        this.steps = this.mathNode.solveAll();
    }

    /**
     * Since there are 2 syntax: the normalized syntax and the non normalized one
     * We must make sure that both syntax produce the same math node
     * For example "4 / 2" when parsed is "{4} / {2}"
     * Then both expression when parsed should have deep equals nodes
     *
     */
    @then("the parsed expression should be isometric")
    public checkNodeIsometric() {
        assert.deepStrictEqual(
            this.mathNode.toJson(),
            parse(this.mathNode.toString()).toJson()
        );
    }
    
    @then("the string output should be {string}")
    public checkToString(result: string) {
        assert.strictEqual(this.mathNode.toString(), result);
    }

    @then("step {int} should be {string}")
    public checkStep(step: number, result: string) {
        assert.strictEqual(this.steps[step].toString(), result);
    }

    @then("step {int} should be atomic")
    public checkLastStepIsAtomic(step: number) {
        assert.strictEqual(this.steps[step].isAtomic, true);
        assert.strictEqual(this.steps[step + 1], undefined);

        // Also checking that evaluate & solve functions are working correctly
        assert.strictEqual(evaluate(this.expression), this.steps[step].value);
        assert.strictEqual(solve(this.expression).value, this.steps[step].value);
    }
}