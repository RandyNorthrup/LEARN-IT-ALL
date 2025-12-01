---
id: lesson-007-011
title: Implement the filter Method on a Prototype
chapterId: chapter-07
order: 11
duration: 5
objectives:
  - Implement the filter Method on a Prototype
---

# Implement the filter Method on a Prototype

You might learn a lot about the `filter` method if you implement your own version of it. It is recommended you use a `for` loop or `Array.prototype.forEach()`.

## Instructions

Write your own `Array.prototype.myFilter()`, which should behave exactly like `Array.prototype.filter()`. You should not use the built-in `filter` method. The `Array` instance can be accessed in the `myFilter` method using `this`.

## Starter Code

```html
Array.prototype.myFilter = function(callback) {
  const newArray = [];
  // Only change code below this line

  // Only change code above this line
  return newArray;
};
```

## Hints

1. `[23, 65, 98, 5, 13].myFilter(item => item % 2)` should equal `[23, 65, 5, 13]`.
2. `["naomi", "quincy", "camperbot"].myFilter(element => element === "naomi")` should return `["naomi"]`.
3. `[1, 1, 2, 5, 2].myFilter((element, index, array) => array.indexOf(element) === index)` should return `[1, 2, 5]`.
4. Your code should not use the `filter` method.

## Solution

```html
```js
Array.prototype.myFilter = function(callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) newArray.push(this[i]);
  }
  return newArray;
};

// Test case
const s = [23, 65, 98, 5];
const odd_s = s.myFilter(item => item % 2 === 1);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8f367417b2b2512b64*
