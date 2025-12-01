---
id: lesson-007-012
title: Return Part of an Array Using the slice Method
chapterId: chapter-07
order: 12
duration: 5
objectives:
  - Return Part of an Array Using the slice Method
---

# Return Part of an Array Using the slice Method

The `slice` method returns a copy of certain elements of an array. It can take two arguments, the first gives the index of where to begin the slice, the second is the index for where to end the slice (and it's non-inclusive). If the arguments are not provided, the default is to start at the beginning of the array through the end, which is an easy way to make a copy of the entire array. The `slice` method does not mutate the original array, but returns a new one.

Here's an example:

```js
const arr = ["Cat", "Dog", "Tiger", "Zebra"];
const newArray = arr.slice(1, 3);
```

`newArray` would have the value `["Dog", "Tiger"]`.

## Instructions

Use the `slice` method in the `sliceArray` function to return part of the `anim` array given the provided `beginSlice` and `endSlice` indices. The function should return an array.

## Starter Code

```html
function sliceArray(anim, beginSlice, endSlice) {
  // Only change code below this line


  // Only change code above this line
}

const inputAnim = ["Cat", "Dog", "Tiger", "Zebra", "Ant"];
sliceArray(inputAnim, 1, 3);
```

## Hints

1. Your code should use the `slice` method.
2. The `inputAnim` variable should not change.
3. `sliceArray(["Cat", "Dog", "Tiger", "Zebra", "Ant"], 1, 3)` should return `["Dog", "Tiger"]`.
4. `sliceArray(["Cat", "Dog", "Tiger", "Zebra", "Ant"], 0, 1)` should return `["Cat"]`.
5. `sliceArray(["Cat", "Dog", "Tiger", "Zebra", "Ant"], 1, 4)` should return `["Dog", "Tiger", "Zebra"]`.

## Solution

```html
```js
function sliceArray(anim, beginSlice, endSlice) {
  return anim.slice(beginSlice, endSlice);
}
const inputAnim = ["Cat", "Dog", "Tiger", "Zebra", "Ant"];
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b90367417b2b2512b65*
