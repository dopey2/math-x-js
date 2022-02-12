import {parse} from "./parser";

const expression = "10 / {3 + 4} + 8 / 5";
let mathNode = parse(expression);

for(let i = 0; i < 10; i++) {
  console.log(mathNode.toString());
  mathNode = mathNode.next();
}