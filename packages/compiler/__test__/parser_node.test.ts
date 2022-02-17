import { parse } from '@math-x-ts/compiler/src';


const expressions = [
    "0",
    "-0",
    "1",
    "-1",
    "(1)",
    "{1}",
    "((1))",
    "{{1}}",
    "(((1)))",
    "{{{1}}}",
    "1 + 2",
    "1 - 2",
    "1 + 2 + 3 ",
    "1 + 2 - 3 ",
    "1 * 2",
    "1 * 2 * 3",
    "6 + 2 * 3",
    "6 * 2 - 3",
    "6 * (4 - 2)",
    "6 * (4 - 2) + 2",
    "6 * (4 + (2 + 2)) + 2",
    "4 / 2",
    "(4 + 4) / (2 + 2)",
]

describe("The toString method of a parsed expression, return the same node when parsed again", () => {
    for(const exp of expressions) {
        const mathNode = parse(exp);
        const mathNode2 = parse(mathNode.toString());
        it(exp, () => {
            expect(mathNode.toJson()).toEqual(mathNode2.toJson())
        })
    }
})