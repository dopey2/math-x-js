# Parser syntax

The parser can understand conventional math expressions and some custom symbols for additional features. 

Here is the full list of supported symbols:


## Symbols list

| Symbol                |     Description      |
|:----------------------|:--------------------:|
| +                     |       Addition       |
| -                     | Subtraction/Negative |
| *                     |    Multiplication    |
| :                     |       Division       |
| /                     |       Fraction       |
| ^                     |     Exponential      |
| (,)                   |     Parenthesis      |
| {,}                   |        Braces        |


## Fraction Syntax

When using fractions, you may have a nominator or denominator that is not a number but instead a mathematical expression.
You can surround the nominator and the denominator with braces to group the expression under the same node.

**Example**

```ts
import { parse } from '@math-x-ts/parser';

const fractionNode = parse('{8 + 4} / {2 * 3}');
```


## Exponent Syntax

As for fractions, your exponent can also be a mathematical expression.
Surround the exponent with braces to group the expression under the same node.

```ts
import { parse } from '@math-x-ts/parser';

const expoNode = parse('{2 ^ {2 * 3}');
```
