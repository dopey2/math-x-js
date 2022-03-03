# Fraction

Fraction class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represents fraction. A fraction is not atomic by default

### constructor(n: MathNode, d: MathNode)

---

## Example

```ts
import { Fraction, Constant } from '@math-x-ts/core';

const leftNode = new Constant(4);
const rightRight = new Constant(2);

const fractionNode = new Fraction(
    left,
    right
);

console.log(fractionNode.isAtomic); // false
console.log(fractionNode.toString()); // '{4} / {2}'
console.log(fractionNode.toTex()); // \frac{4}{2}'
```
