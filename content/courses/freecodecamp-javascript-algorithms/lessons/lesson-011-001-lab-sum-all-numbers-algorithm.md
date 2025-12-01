---
id: lesson-011-001
title: Design a Sum All Numbers Algorithm
chapterId: chapter-11
order: 1
duration: 5
objectives:
  - Design a Sum All Numbers Algorithm
---

# Design a Sum All Numbers Algorithm

In this lab, you will need to design a sum all numbers algorithm.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a function named `sumAll` that accepts an array of two numbers.
1. `sumAll([n, m])` should return the sum of `n` and `m` plus the sum of all the numbers between them. The lowest number will not always come first. For example, `sumAll([4,1])` should return `10` because sum of all the numbers between `1` and `4` (both inclusive) is `10`.

## Starter Code

```html
```js
```
```

## Hints

1. You should have a function named `sumAll`.
2. `sumAll([1, 4])` should return a number.
3. `sumAll([1, 4])` should return `10`.
4. `sumAll([4, 1])` should return `10`.
5. `sumAll([5, 10])` should return `45`.
6. `sumAll([10, 5])` should return `45`.

## Solution

```html
```js
function sumAll(arr) {
  let sum = 0;
  
  arr.sort((a, b) => a - b);

  for (var i = arr[0]; i <= arr[1]; i++) {
    sum += i;
  }

  return sum;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a3566b1109230028080c9345*
