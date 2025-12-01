---
id: lesson-008-011
title: Drop it
chapterId: chapter-08
order: 11
duration: 5
objectives:
  - Drop it
---

# Drop it

Given the array `arr`, iterate through and remove each element starting from the first element (the 0 index) until the function `func` returns `true` when the iterated element is passed through it.

Then return the rest of the array once the condition is satisfied, otherwise, `arr` should be returned as an empty array.

## Starter Code

```html
function dropElements(arr, func) {
  return arr;
}

dropElements([1, 2, 3], function(n) {return n < 3; });
```

## Hints

1. `dropElements([1, 2, 3, 4], function(n) {return n >= 3;})` should return `[3, 4]`.
2. `dropElements([0, 1, 0, 1], function(n) {return n === 1;})` should return `[1, 0, 1]`.
3. `dropElements([1, 2, 3], function(n) {return n > 0;})` should return `[1, 2, 3]`.
4. `dropElements([1, 2, 3, 4], function(n) {return n > 5;})` should return `[]`.
5. `dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;})` should return `[7, 4]`.
6. `dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;})` should return `[3, 9, 2]`.

## Solution

```html
```js
function dropElements(arr, func) {
  while (arr.length && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a5deed1811a43193f9f1c841*
