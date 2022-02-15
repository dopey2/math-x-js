import { parse } from "./parser";


const expression = "4 : 2";
let mathNode = parse(expression);

for(let i = 0; i < 10; i++) {
    console.log(mathNode.toString());
    mathNode = mathNode.next();
}