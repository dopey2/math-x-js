# @math-x-ts/generix
___

> As the word "Generix" is derived from "Generation", "Generator", this library
focus on data generation from given informations. For example you can use this library to generate combinations & permutation.


## Installation


```bash
npm install --save @math-x-ts/generix
```
or
```bash
yarn add @math-x-ts/generix
```

## Package content

- Permutation class. Used to generated permutation with or without repetitions
- Combination class. Used to generated combination with or without repetitions



**Named imports**
```typescript
import { Combination, Permutation } from '@math-x-ts/generix';
```

**Default imports**
```typescript
import Combination from '@math-x-ts/generix/Combination';
import Permutation from '@math-x-ts/generix/Permutation';
```

## Usage

### Combination without repetition


```typescript
const result = Combination.withoutRepetition(['A', 'B', 'C']);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'B', 'C']
]
```
</details>



#### Pick without repetition 1 element from the set ['A', 'B', 'C'];

```typescript
const result = Combination.withoutRepetition(['A', 'B', 'C'], 1);
console.log(result);
```


<details>
    <summary>Output</summary>

```typescript
[
    ['A'],
    ['B'],
    ['C'],
]
```
</details>

#### Pick without repetition 2 elements from the set ['A', 'B', 'C'];

```typescript
const result = Combination.withoutRepetition(['A', 'B', 'C'], 2);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'C'],
]
```
</details>

#### Pick without repetition between 2 and 3 elements from the set ['A', 'B', 'C', 'D'];

```typescript
const result = Combination.withoutRepetition(['A', 'B', 'C'], 2, 3);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['B', 'C'],
    ['B', 'D'],
    ['C', 'D'],
    ['A', 'B', 'C'],
    ['A', 'B', 'D'],
    ['A', 'C', 'D'],
    ['B', 'C', 'D'],
]
```
</details>


### Combination with repetition

```typescript
const result = Combination.withRepetition(['A', 'B', 'C']);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'A', 'A'],
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['A', 'B', 'B'],
    ['A', 'B', 'C'],
    ['A', 'C', 'C'],
    ['B', 'B', 'B'],
    ['B', 'B', 'C'],
    ['B', 'C', 'C'],
    ['C', 'C', 'C']
]
```
</details>



#### Pick with repetition 1 element from the set ['A', 'B', 'C'];

```typescript
const result = Combination.withRepetition(['A', 'B', 'C'], 1);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A'],
    ['B'],
    ['C'],
]
```
</details>

#### Pick with repetition 2 elements from the set ['A', 'B', 'C'];

```typescript
const result = Combination.withRepetition(['A', 'B', 'C'], 2);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'B'],
    ['B', 'C'],
    ['C', 'C'],
]
```
</details>

#### Pick with repetition between 2 and 4 elements from the set ['A', 'B', 'C'];

```typescript
const result = Combination.withRepetition(['A', 'B', 'C'], 2, 4);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'B'],
    ['B', 'C'],
    ['C', 'C'],
    ['A', 'A', 'A'],
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['A', 'B', 'B'],
    ['A', 'B', 'C'],
    ['A', 'C', 'C'],
    ['B', 'B', 'B'],
    ['B', 'B', 'C'],
    ['B', 'C', 'C'],
    ['C', 'C', 'C'],
    ['A','A','A','A'],
    ['A','A','A','B'],
    ['A','A','A','C'],
    ['A','A','B','B'],
    ['A','A','B','C'],
    ['A','A','C','C'],
    ['A','B','B','B'],
    ['A','B','B','C'],
    ['A','B','C','C'],
    ['A','C','C','C'],
    ['B','B','B','B'],
    ['B','B','B','C'],
    ['B','B','C','C'],
    ['B','C','C','C'],
    ['C','C','C','C']

]
```
</details>

### Permutation without repetition


```typescript
const result = Permutation.withoutRepetition(['A', 'B', 'C']);
console.log(result);
```


<details>
    <summary>Output</summary>

```typescript
[
    ['A','B','C'],
    ['A','C','B'],
    ['B','A','C'],
    ['B','C','A'],
    ['C','A','B'],
    ['C','B','A']
]
```
</details>

#### Pick without repetition 2 elements from the set ['A', 'B', 'C'];

```typescript
const result = Permutation.withoutRepetition(['A', 'B', 'C'], 2);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A','B'],
    ['A','C'],
    ['B','A'],
    ['B','C'],
    ['C','A'],
    ['C','B']
]
```
</details>


#### Pick without repetition between 2 and 3 element from the set ['A', 'B', 'C'];

```typescript
const result = Permutation.withoutRepetition(['a', 'b', 'c'], 2, 3);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['a','b'],
    ['a','c'],
    ['b','a'],
    ['b','c'],
    ['c','a'],
    ['c','b'],
    ['a','b','c'],
    ['a','c','b'],
    ['b','a','c'],
    ['b','c','a'],
    ['c','a','b'],
    ['c','b','a']
]
```
</details>


### Permutation with repetition


```typescript
const result = Permutation.withRepetition(['A', 'B']);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A','A'],
    ['A','B'],
    ['B','A'],
    ['B','B']
]
```
</details>



#### Pick with repetition 2 elements from the set ['A', 'B', 'C'];

```typescript
const result = Permutation.withRepetition(['A', 'B', 'C'], 2);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A','A'],
    ['A','B'],
    ['A','C'],
    ['B','A'],
    ['B','B'],
    ['B','C'],
    ['C','A'],
    ['C','B'],
    ['C','C']
]
```
</details>

#### Pick with repetition between 2 and 3 elements from the set ['A', 'B'];

```typescript
const result = Permutation.withRepetition(['A', 'B'], 2, 3);
console.log(result);
```

<details>
    <summary>Output</summary>

```typescript
[
    ['A','A'],
    ['A','B'],
    ['B','A'],
    ['B','B'],
    ['A','A','A'],
    ['A','A','B'],
    ['A','B','A'],
    ['A','B','B'],
    ['B','A','A'],
    ['B','A','B'],
    ['B','B','A'],
    ['B','B','B']
]
```
</details>

