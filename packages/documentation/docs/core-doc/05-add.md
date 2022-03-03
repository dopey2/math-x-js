# Add

Add class extends **MathNode**. You can check  [MathNode](./mathNode) for more information.
This class represent the addition operation. An addition is not atomic by default

### constructor(left: MathNode, right: MathNode)

---

## Example

```ts
import { Add, Constant } from '@math-x-ts/core';

const leftNode = new Constant(3);
const rightRight = new Constant(2);

const addNode = new Add(
    left,
    right
);

console.log(addNode.isAtomic); // false
console.log(addNode.toString()); // '3 + 2'
```

:::caution
If the right node is a constant with a negative value the constructor will return a new [Subtract](./subtract) instance
:::

## Right negative constant example

```ts
import { Add, Constant, MathNodeType } from '@math-x-ts/core';

const leftNode = new Constant(3);
const rightRight = new Constant(-2);

const node = new Add(
    left,
    right
);

console.log(node.isAtomic); // false
console.log(node.toString()); // '3 - 2'
console.log(node.type === MathNodeType.Subtract); // true
```