# Content

The **@math-x-ts/parser** package contain some high level functions which help to parse and evaluate math expressions

## parse

This is the main function from this package. It parses math expression and create a binary tree
using **@math-x-ts/core**

### example

```ts
import { parse } from '@math-x-ts/parser'

const mathNode1 = parse('1 + 2 + 3');
const mathNode2 = mathNode1.next();
const mathNode3 = mathNode2.next();

console.log(mathNode1.isAtomic); // false
console.log(mathNode2.isAtomic); // false
console.log(mathNode3.isAtomic); // true

console.log(mathNode1.toString()); // '1 + 2 + 3'
console.log(mathNode2.toString()); // '3 + 3'
console.log(mathNode3.toString()); // '6'
console.log(mathNode3.value); // 6
```

## solve

This function is build on top of [parse](./content#parse). It parses the expression then it solves it (returns the last step)

### example

```ts
import { solve } from '@math-x-ts/parser'

const mathNode = solve('1 + 2 + 3');

console.log(mathNode.isAtomic); // true
console.log(mathNode.toString); // '6'
console.log(mathNode.value);  // 6
```

## evaluate

This function is build on top of [parse](./content#parse). It parses the expression then it solves it, and finally it returns its value as a number

### example

```ts
import { evaluate } from '@math-x-ts/parser'

const value = evaluate('1 + 2 + 3');

console.log(value); // 6
```
