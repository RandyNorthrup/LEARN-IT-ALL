---
id: lesson-007-013
title: Combine Two Arrays Using the concat Method
chapterId: chapter-07
order: 13
duration: 5
objectives:
  - Combine Two Arrays Using the concat Method
---

# Combine Two Arrays Using the concat Method

<dfn>Concatenation</dfn> means to join items end to end. JavaScript offers the `concat` method for both strings and arrays that work in the same way. For arrays, the method is called on one, then another array is provided as the argument to `concat`, which is added to the end of the first array. It returns a new array and does not mutate either of the original arrays. Here's an example:

```js
[1, 2, 3].concat([4, 5, 6]);
```

The returned array would be `[1, 2, 3, 4, 5, 6]`.

## Instructions

Use the `concat` method in the `nonMutatingConcat` function to concatenate `attach` to the end of `original`. The function should return the concatenated array.

## Starter Code

```html
function nonMutatingConcat(original, attach) {
  // Only change code below this line


  // Only change code above this line
}

const first = [1, 2, 3];
const second = [4, 5];
nonMutatingConcat(first, second);
```

## Hints

1. Your code should use the `concat` method.
2. The `first` array should not change.
3. The `second` array should not change.
4. `nonMutatingConcat([1, 2, 3], [4, 5])` should return `[1, 2, 3, 4, 5]`.

## Solution

```html
```js
function nonMutatingConcat(original, attach) {
  return original.concat(attach);
}
const first = [1, 2, 3];
const second = [4, 5];
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7da9367417b2b2512b66*
