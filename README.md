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
import { evaluate } from 'math-x-ts';

const value = evaluate("4 + (3 * 2)");
console.log(value); // 10
```

### Solve an expression

```ts
import { solve } from 'math-x-ts';  

const mathNode = solve("4 + (3 * 2)");
console.log(mathNode); // new Constant(10)
```
