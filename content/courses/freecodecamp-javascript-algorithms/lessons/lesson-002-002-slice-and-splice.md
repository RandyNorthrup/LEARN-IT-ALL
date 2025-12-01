---
id: lesson-002-002
title: Slice and Splice
chapterId: chapter-02
order: 2
duration: 5
objectives:
  - Slice and Splice
---

# Slice and Splice

You are given two arrays and an index.

Copy each element of the first array into the second array, in order.

Begin inserting elements at index `n` of the second array.

Return the resulting array. The input arrays should remain the same after the function runs.

## Starter Code

```html
function frankenSplice(arr1, arr2, n) {
  return arr2;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);
```

## Hints

1. `frankenSplice([1, 2, 3], [4, 5], 1)` should return `[4, 1, 2, 3, 5]`.
2. `frankenSplice([1, 2], ["a", "b"], 1)` should return `["a", 1, 2, "b"]`.
3. `frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2)` should return `["head", "shoulders", "claw", "tentacle", "knees", "toes"]`.
4. All elements from the first array should be added to the second array in their original order. `frankenSplice([1, 2, 3, 4], [], 0)` should return `[1, 2, 3, 4]`.
5. The first array should remain the same after the function runs.
6. The second array should remain the same after the function runs.

## Solution

```html
```js
function frankenSplice(arr1, arr2, n) {
  // It's alive. It's alive!
  let result = arr2.slice();
  for (let i = 0; i < arr1.length; i++) {
    result.splice(n + i, 0, arr1[i]);
  }
  return result;
}

frankenSplice([1, 2, 3], [4, 5], 1);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 579e2a2c335b9d72dd32e05c*
