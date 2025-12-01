---
id: lesson-007-001
title: Use Higher-Order Functions map, filter, or reduce to Solve a Complex Problem
chapterId: chapter-07
order: 1
duration: 5
objectives:
  - Use Higher-Order Functions map, filter, or reduce to Solve a Complex Problem
---

# Use Higher-Order Functions map, filter, or reduce to Solve a Complex Problem

Now that you have worked through a few challenges using higher-order functions like `map()`, `filter()`, and `reduce()`, you now get to apply them to solve a more complex challenge.

## Instructions

Complete the code for the `squareList` function using any combination of `map()`, `filter()`, and `reduce()`. The function should return a new array containing the squares of *only* the positive integers (decimal numbers are not integers) when an array of real numbers is passed to it. An example of an array of real numbers is `[-3, 4.8, 5, 3, -3.2]`.

**Note:** Your function should not use any kind of `for` or `while` loops or the `forEach()` function.

## Starter Code

```html
const squareList = arr => {
  // Only change code below this line
  return arr;
  // Only change code above this line
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);
```

## Hints

1. `squareList` should be a `function`.
2. `for`, `while`, and `forEach` should not be used.
3. `map`, `filter`, or `reduce` should be used.
4. The function should return an `array`.
5. `squareList([4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2])` should return `[16, 1764, 36]`.
6. `squareList([-3.7, -5, 3, 10, 12.5, 7, -4.5, -17, 0.3])` should return `[9, 100, 49]`.

## Solution

```html
```js
const squareList = arr => {
  const positiveIntegers = arr.filter(num => {
    return num >= 0 && Number.isInteger(num);
  });
  const squaredIntegers = positiveIntegers.map(num => {
    return num ** 2;
  });
  return squaredIntegers;
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b88367417b2b2512b45*
