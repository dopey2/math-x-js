# math-x-ts
> Math parser, AST builder for math expression &amp; step by step solution

<br>

<p>
  <a href="https://www.npmjs.com/package/@math-x-ts/parser"><img src="https://img.shields.io/npm/v/@math-x-ts/parser.svg?&color=default" alt="npm version"></a>
  <a href="https://github.com/dopey2/math-x-ts/actions/workflows/main-dev.yml"><img src="https://github.com/dopey2/math-x-ts/actions/workflows/main-dev.yml/badge.svg" alt="CI"></a>
  <a href="CONTRIBUTING.md#pull-requests"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>    


**[📝 Documentation](https://mathxts.netlify.app/docs/intro)** 
<br>
**[🧑‍💻 Live Demo](https://mathxts.netlify.app/docs/live-example)**
<br>


## Introduction
This library is part of an educational project. Its main goal is to give a step by step solution for any mathematical expression.

## Install

```bash
npm install --save @math-x-ts/parser
```
or
```bash
yarn add @math-x-ts/parser
```

## Usage

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

console.log(steps[0].toString()); // '4 * (1 + 2)'
console.log(steps[1].toString()); // '4 * 3'
console.log(steps[2].toString()); // '12'
```
