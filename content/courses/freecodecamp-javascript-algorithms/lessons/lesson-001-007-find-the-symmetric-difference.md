---
id: lesson-001-007
title: Find the Symmetric Difference
chapterId: chapter-01
order: 7
duration: 5
objectives:
  - Find the Symmetric Difference
---

# Find the Symmetric Difference

The mathematical term <dfn>symmetric difference</dfn> (`△` or `⊕`) of two sets is the set of elements which are in either of the two sets but not in both. For example, for sets `A = {1, 2, 3}` and `B = {2, 3, 4}`, `A △ B = {1, 4}`.

Symmetric difference is a binary operation, which means it operates on only two elements. So to evaluate an expression involving symmetric differences among *three* elements (`A △ B △ C`), you must complete one operation at a time. Thus, for sets `A` and `B` above, and `C = {2, 3}`, `A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}`.

## Instructions

Create a function that takes two or more arrays and returns an array of their symmetric difference. The returned array must contain only unique values (*no duplicates*).

## Starter Code

```html
function sym(args) {
  return args;
}

sym([1, 2, 3], [5, 2, 1, 4]);
```

## Hints

1. `sym([1, 2, 3], [5, 2, 1, 4])` should return `[3, 4, 5]`.
2. `sym([1, 2, 3], [5, 2, 1, 4])` should contain only three elements.
3. `sym([1, 2, 3, 3], [5, 2, 1, 4])` should return `[3, 4, 5]`.
4. `sym([1, 2, 3, 3], [5, 2, 1, 4])` should contain only three elements.
5. `sym([1, 2, 3], [5, 2, 1, 4, 5])` should return `[3, 4, 5]`.
6. `sym([1, 2, 3], [5, 2, 1, 4, 5])` should contain only three elements.
7. `sym([1, 2, 5], [2, 3, 5], [3, 4, 5])` should return `[1, 4, 5]`.
8. `sym([1, 2, 5], [2, 3, 5], [3, 4, 5])` should contain only three elements.
9. `sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])` should return `[1, 4, 5]`.
10. `sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])` should contain only three elements.
11. `sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])` should return `[2, 3, 4, 6, 7]`.
12. `sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])` should contain only five elements.
13. `sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])` should return `[1, 2, 4, 5, 6, 7, 8, 9]`.
14. `sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])` should contain only eight elements.

## Solution

```html
```js
function sym() {
  var arrays = [].slice.call(arguments);
  return arrays.reduce(function (symDiff, arr) {
    return symDiff.concat(arr).filter(function (val, idx, theArr) {
      return theArr.indexOf(val) === idx
        && (symDiff.indexOf(val) === -1 || arr.indexOf(val) === -1);
    });
  });
}
sym([1, 2, 3], [5, 2, 1, 4]);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a3f503de51cf954ede28891d*
