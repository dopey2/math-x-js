import { parse } from "./parser";


const solve = (expression: string) => {
    return parse(expression).solve();
};

const evaluate = (expression: string) => {
    return parse(expression).evaluate();
};

export {
    parse,
    solve,
    evaluate
};
