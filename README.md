# math-x-ts
Math parser, AST builder for math expression &amp; step by step solution

## Introduction
This library is part of an educational project. Its main goal is to give a step by step solution for any mathematical expression.

## Install

```bash
npm install --save math-x-ts
```
or
```bash
yarn add math-x-ts
```

## Usage

### Evaluate an expression

```ts
import { evaluate } from '@math-x-ts/compiler';

const value = evaluate('4 + (3 * 2)');
console.log(value); // 10
```

### Solve an expression

```ts
import { solve } from '@math-x-ts/compiler';
import { Constant } from '@math-x-ts/core'

const mathNode = solve('4 + (3 * 2)');
console.log(mathNode.value); // 10
console.log(mathNode); // new Constant(10)
console.log(mathNode instanceof Constant) // true
```
I will below in the docs what **Constant** is and the rest of "@math-x-ts/core"

### Compile an expression

```ts
import { parse } from '@math-x-ts/compiler'
import { Add, Constant, MathNode, MathNodeType, Multiply, Parenthesis } from '@math-x-ts/core';
import { isEqual } from 'lodash';

const mathNodeA = parse("4 + (3 * 2)");

const mathNodeB = new Add(
    new Constant(4),
    new Parenthesis(
        new Multiply(
            new Constant(3),
            new Constant(2)
        )
    )
);

const mathNodeJson = {
    type: MathNodeType.Add,
    left: {
        type: MathNodeType.Constant,
        value: 4
    },
    right: {
        type: MathNodeType.Parenthesis,
        content: {
            type: MathNodeType.Multiply,
            left: {
                type: MathNodeType.Constant,
                value: 3,
            },
            right: {
                type: MathNodeType.Constant,
                value: 2,
            }
        }
    }
}

console.log(isEqual(mathNodeA.toJson(), mathNodeB.toJson())); // true
console.log(isEqual(mathNodeA.toJson(), mathNodeJson)); // true
```

