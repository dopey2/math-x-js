
# Constant

Constant class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent constant values in a mathematical expression. A constant is atomic by default

### constructor(value: number)

## Example

```ts
import { Constant } from '@math-x-ts/core';

const node = new Constant(3);

console.log(node.isAtomic); // true
console.log(node.value); // 3
console.log(node.toString()); // '3'
```
