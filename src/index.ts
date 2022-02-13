import { parse } from "./parser";


const solve = (expression: string) => {
    return parse(expression).solve();
};

export { parse, solve };