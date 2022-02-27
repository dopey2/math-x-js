# Multiply

Multiply class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent the multiplication operation. A multiplication is not atomic by default

### constructor(left: MathNode, right: MathNode)

---

## Example

```ts
import { Multiply, Constant } from '@math-x-ts/core';

const leftNode = new Constant(3);
const rightRight = new Constant(2);

const multiplyNode = new Multiply(
    left,
    right
);

console.log(multiplyNode.isAtomic); // false
console.log(multiplyNode.toString()); // '3 * 2'
```