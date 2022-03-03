# Negative

Negative class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent a negative operation. A negative operation is not atomic by default.

### constructor(content: MathNode)

---

## Example

```ts
import { Add, Parenthesis, Negative } from '@math-x-ts/core';


const add = new Add(
    new Constant(5),
    new Constant(3),
)

const negative = new Negative(new Parenthesis(add));


console.log(negative.isAtomic); // false
console.log(negative.toString()); // '-(5 + 3)'
```
