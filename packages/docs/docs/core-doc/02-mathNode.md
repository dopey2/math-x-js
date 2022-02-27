
# MathNode

MathNode is the base class for every node & leafs in the binary tree.
Each concrete class under **@math-x-ts/core** extends **MathNode**, every properties/methods
shown below are public available inside each concrete class of **@math-x-ts/core**

## Properties

### type: [MathNodeType](./mathNodeType)
The type of the current node.

---

### value: number
The value of the current node as a number

---

### isAtomic: boolean

Tell if the current node is atomic. An atomic node is a node that can't be split, can't be simplified.
An example of an atomic node is a constant, and an example of a non-atomic node is the expression "1 + 2".
If you visualize it as a binary tree, atomic nodes are actually the leafs of the tree.

---

## Methods

### next(): MathNode

The next method try to simplify the current node and return the next step as a MathNode.
If the node is atomic then it just returns the same instance.
When trying to simplify a node, it always starts with the deepest node in the tree.

---

### toString(): string

Return the string representation of the current node.

---

### toTex(): string

Return a valid latex string for the current node.
You can pass the output of this method to a library like [Katex](https://katex.org/) or [Mathjax](https://www.mathjax.org/) 
to build DOM element.
For now .toString() and .toTex are almost similar in terms of output except for fractions and exponents.

---

### isEqual(mathNode: MathNode): boolean

Return true if the nodes are deep equals.


### solveAll(): MathNode[]

This method solve the node step by step.
It calls the **next()** method until the node is atomic and return an array
of MathNode for each step. 

### solveAllToJson(): Object[]

Same as **solveAll()** but calls **toJson()** methods for each step

### solveAllToString(): string[]

Same as **solveAll()** but calls **toString()** methods for each step

### solveAllToTex(): string[]

Same as **solveAll()** but calls **toTex()** methods for each step

### solve(): MathNode

Solve the node until it is atomic, and return only the last step

### evaluate(): number

Solve the node until it is atomic, and return its value as a number.