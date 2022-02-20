---
sidebar_position: 1
---

# Introduction

This library is part of an educational project. Its main goal is to return step by step
solution for any mathematical expression.

## Features

- 🖥 Parse mathematical expression
- 🔢 Evaluate a mathematical expression
- 📄 Get step by step solution
- ✏ Produce Latex output
- 🌳 Build AST (restructure the data as a syntax tree)
  
## Basic Examples

### Evaluate an expression

```ts
import { evaluate } from '@math-x-ts/parser';

console.log(evaluate('4 * (1 + 2)')) // 12;
``` 

### Get step by step solution

```ts
import { parse } from '@math-x-ts/parser';

const mathNode = parse('4 * (1 + 2)');
const steps = mathNode.solveAll();

console.log(steps[0].toString()); // 4 * (1 + 2)
console.log(steps[1].toString()); // 4 * 3
console.log(steps[2].toString()); // 12
``` 