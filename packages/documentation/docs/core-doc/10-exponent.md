# Exponent

Exponent class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent the exponential operation. An exponential operation is not atomic by default

### constructor(base: MathNode, exponent: MathNode)

---

## Example

```ts
import { Exponent, Constant } from '@math-x-ts/core';

const base = new Constant(2);
const expo = new Constant(3);

const expoOperationNode = new Exponent(
    base,
    expo
);

console.log(fractionNode.isAtomic); // false
console.log(fractionNode.toString()); // '2 ^ {3}'
```
