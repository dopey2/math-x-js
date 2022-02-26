
# MathNode

MathNode is the base class for every node & leafs in the binary tree.
Each concrete class under **@math-x-ts/core** extends **MathNode**, every properties/functions
shown below are public available inside each concrete class of **@math-x-ts/core**

## Properties

### type: [MathNodeType](./mathNodeType)
The type of the current node.

### value: number
The value of the current node as a number

### isAtomic: boolean

Tell if the current node is atomic. An atomic node is a node that can't be split, can't be simplified.
An example of an atomic node is a constant, and an example of a non-atomic node is the expression "1 + 2".
If you visualize it as a binary tree, atomic nodes are actually the leafs of the tree.


## Functions

### next: () => MathNode

The next function try to simplify the current node and return the next step as a MathNode.
If the node is atomic then it just returns the same instance.
When trying to simplify a node, it always starts with the deepest node in the tree.

### toString: () => string

Return the string representation of the current node.

### toTex: () => string

Return a valid latex string for the current node.
You can use a library like [Katex](https://katex.org/) or [Mathjax](https://www.mathjax.org/) 
to build DOM element from the output of this function.
For now .toString() and .toTex are almost similar in terms of output except for fractions and exponents.