---
id: lesson-002-007
title: Finders Keepers
chapterId: chapter-02
order: 7
duration: 5
objectives:
  - Finders Keepers
---

# Finders Keepers

Create a function that looks through an array `arr` and returns the first element in it that passes a 'truth test'. This means that given an element `x`, the 'truth test' is passed if `func(x)` is `true`. If no element passes the test, return `undefined`.

## Starter Code

```html
function findElement(arr, func) {
  let num = 0;
  return num;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);
```

## Hints

1. `findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; })` should return `8`.
2. `findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; })` should return `undefined`.

## Solution

```html
```js
function findElement(arr, func) {
  return arr.filter(func)[0];
}

findElement([1, 2, 3, 4], num => num % 2 === 0);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a6e40f1041b06c996f7b2406*
