---
id: lesson-007-009
title: Implement map on a Prototype
chapterId: chapter-07
order: 9
duration: 5
objectives:
  - Implement map on a Prototype
---

# Implement map on a Prototype

As you have seen from applying `Array.prototype.map()`, or simply `map()` earlier, the `map` method returns an array of the same length as the one it was called on. It also doesn't alter the original array, as long as its callback function doesn't.

In other words, `map` is a pure function, and its output depends solely on its inputs. Plus, it takes another function as its argument.

You might learn a lot about the `map` method if you implement your own version of it. It is recommended you use a `for` loop or `Array.prototype.forEach()`.

## Instructions

Write your own `Array.prototype.myMap()`, which should behave exactly like `Array.prototype.map()`. You should not use the built-in `map` method. The `Array` instance can be accessed in the `myMap` method using `this`.

## Starter Code

```html
Array.prototype.myMap = function(callback) {
  const newArray = [];
  // Only change code below this line

  // Only change code above this line
  return newArray;
};
```

## Hints

1. `[23, 65, 98, 5, 13].myMap(item => item * 2)` should equal `[46, 130, 196, 10, 26]`.
2. `["naomi", "quincy", "camperbot"].myMap(element => element.toUpperCase())` should return `["NAOMI", "QUINCY", "CAMPERBOT"]`.
3. `[1, 1, 2, 5, 2].myMap((element, index, array) => array[index + 1] || array[0])` should return `[1, 2, 5, 2, 1]`.
4. Your code should not use the `map` method.

## Solution

```html
```js
Array.prototype.myMap = function(callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};

// Test case
const s = [23, 65, 98, 5];
const doubled_s = s.myMap(item => item * 2);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8f367417b2b2512b62*
