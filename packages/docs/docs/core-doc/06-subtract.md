# Subtract

Subtract class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent the subtraction operation. A subtraction is not atomic by default

### constructor(left: MathNode, right: MathNode)

---

## Example

```ts
import { Subtract, Constant } from '@math-x-ts/core';

const leftNode = new Constant(8);
const rightRight = new Constant(4);

const subtractNode = new Subtract(
    left,
    right
);

console.log(subtractNode.isAtomic); // false
console.log(subtractNode.toString()); // '8 - 4'
```