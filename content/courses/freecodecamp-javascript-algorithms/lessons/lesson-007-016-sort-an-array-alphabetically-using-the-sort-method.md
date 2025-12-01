---
id: lesson-007-016
title: Sort an Array Alphabetically using the sort Method
chapterId: chapter-07
order: 16
duration: 5
objectives:
  - Sort an Array Alphabetically using the sort Method
---

# Sort an Array Alphabetically using the sort Method

The `sort` method sorts the elements of an array according to the callback function.

For example:

```js
function ascendingOrder(arr) {
  return arr.sort(function(a, b) {
    return a - b;
  });
}

ascendingOrder([1, 5, 2, 3, 4]);
```

This would return the value `[1, 2, 3, 4, 5]`.

```js
function reverseAlpha(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a < b ? 1 : -1;
  });
}

reverseAlpha(['l', 'h', 'z', 'b', 's']);
```

This would return the value `['z', 's', 'l', 'h', 'b']`.

JavaScript's default sorting method is by string Unicode point value, which may return unexpected results. Therefore, it is encouraged to provide a callback function to specify how to sort the array items. When such a callback function, normally called `compareFunction`, is supplied, the array elements are sorted according to the return value of the `compareFunction`: If `compareFunction(a,b)` returns a value less than 0 for two elements `a` and `b`, then `a` will come before `b`. If `compareFunction(a,b)` returns a value greater than 0 for two elements `a` and `b`, then `b` will come before `a`. If `compareFunction(a,b)` returns a value equal to 0 for two elements `a` and `b`, then `a` and `b` will remain unchanged.

## Instructions

Use the `sort` method in the `alphabeticalOrder` function to sort the elements of `arr` in alphabetical order. The function should return the sorted array.

## Starter Code

```html
function alphabeticalOrder(arr) {
  // Only change code below this line

  return arr
  // Only change code above this line
}

alphabeticalOrder(["a", "d", "c", "a", "z", "g"]);
```

## Hints

1. Your code should use the `sort` method.
2. `alphabeticalOrder(["a", "d", "c", "a", "z", "g"])` should return `["a", "a", "c", "d", "g", "z"]`.
3. `alphabeticalOrder(["x", "h", "a", "m", "n", "m"])` should return `["a", "h", "m", "m", "n", "x"]`.
4. `alphabeticalOrder(["a", "a", "a", "a", "x", "t"])` should return `["a", "a", "a", "a", "t", "x"]`.

## Solution

```html
```js
function alphabeticalOrder(arr) {
  return arr.sort();
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7da9367417b2b2512b69*
