---
id: lesson-007-017
title: Return a Sorted Array Without Changing the Original Array
chapterId: chapter-07
order: 17
duration: 5
objectives:
  - Return a Sorted Array Without Changing the Original Array
---

# Return a Sorted Array Without Changing the Original Array

A side effect of the `sort` method is that it changes the order of the elements in the original array. In other words, it mutates the array in place. One way to avoid this is to first concatenate an empty array to the one being sorted (remember that `slice` and `concat` return a new array), then run the `sort` method.

## Instructions

Use the `sort` method in the `nonMutatingSort` function to sort the elements of an array in ascending order. The function should return a new array, and not mutate the `globalArray` variable.

## Starter Code

```html
const globalArray = [5, 6, 3, 2, 9];

function nonMutatingSort(arr) {
  // Only change code below this line


  // Only change code above this line
}

nonMutatingSort(globalArray);
```

## Hints

1. Your code should use the `sort` method.
2. The `globalArray` variable should not change.
3. `nonMutatingSort(globalArray)` should return `[2, 3, 5, 6, 9]`.
4. `nonMutatingSort(globalArray)` should not be hard coded.
5. The function should return a new array, not the array passed to it.
6. `nonMutatingSort([1, 30, 4, 21, 100000])` should return `[1, 4, 21, 30, 100000]`.
7. `nonMutatingSort([140000, 104, 99])` should return `[99, 104, 140000]`.

## Solution

```html
```js
const globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  return [].concat(arr).sort((a,b) => a-b);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7da9367417b2b2512b6a*
