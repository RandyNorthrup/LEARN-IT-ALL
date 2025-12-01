---
id: lesson-007-014
title: Add Elements to the End of an Array Using concat Instead of push
chapterId: chapter-07
order: 14
duration: 5
objectives:
  - Add Elements to the End of an Array Using concat Instead of push
---

# Add Elements to the End of an Array Using concat Instead of push

Functional programming is all about creating and using non-mutating functions.

The last challenge introduced the `concat` method as a way to merge arrays into a new array without mutating the original arrays. Compare `concat` to the `push` method. `push` adds items to the end of the same array it is called on, which mutates that array. Here's an example:

```js
const arr = [1, 2, 3];
arr.push(4, 5, 6);
```

`arr` would have a modified value of `[1, 2, 3, 4, 5, 6]`, which is not the functional programming way.

`concat` offers a way to merge new items to the end of an array without any mutating side effects.

## Instructions

Change the `nonMutatingPush` function so it uses `concat` to merge `newItem` to the end of `original` without mutating `original` or `newItem` arrays. The function should return an array.

## Starter Code

```html
function nonMutatingPush(original, newItem) {
  // Only change code below this line
  return original.push(newItem);

  // Only change code above this line
}

const first = [1, 2, 3];
const second = [4, 5];
nonMutatingPush(first, second);
```

## Hints

1. Your code should use the `concat` method.
2. Your code should not use the `push` method.
3. The `first` array should not change.
4. The `second` array should not change.
5. `nonMutatingPush([1, 2, 3], [4, 5])` should return `[1, 2, 3, 4, 5]`.

## Solution

```html
```js
function nonMutatingPush(original, newItem) {
  return original.concat(newItem);
}
const first = [1, 2, 3];
const second = [4, 5];
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7da9367417b2b2512b67*
