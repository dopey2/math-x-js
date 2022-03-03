# Divide

Divide class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent the division operation. A division is not atomic by default

### constructor(left: MathNode, right: MathNode)

---

## Example

```ts
import { Divide, Constant } from '@math-x-ts/core';

const leftNode = new Constant(4);
const rightRight = new Constant(2);

const divideNode = new Divide(
    left,
    right
);

console.log(divideNode.isAtomic); // false
console.log(divideNode.toString()); // '4 : 2'
```