# Parenthesis

Parenthesis class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent a parenthesis. A parenthesis is not atomic by default

### constructor(content: MathNode)

---

## Example

```ts
import { Add, Constant, Multiply, Parenthesis } from '@math-x-ts/core';


const node = new Parenthesis(
    new Add(
        new Constant(3),
        new Constant(4),
    )
)

console.log(node.isAtomic); // false
console.log(node.toString()); // '(3 + 4)'
```
