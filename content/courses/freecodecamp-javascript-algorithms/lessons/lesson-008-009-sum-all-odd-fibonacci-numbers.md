---
id: lesson-008-009
title: Sum All Odd Fibonacci Numbers
chapterId: chapter-08
order: 9
duration: 5
objectives:
  - Sum All Odd Fibonacci Numbers
---

# Sum All Odd Fibonacci Numbers

Given a positive integer `num`, return the sum of all odd Fibonacci numbers that are less than or equal to `num`.

The first two numbers in the Fibonacci sequence are 0 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first seven numbers of the Fibonacci sequence are 0, 1, 1, 2, 3, 5 and 8.

For example, `sumFibs(10)` should return `10` because all odd Fibonacci numbers less than or equal to `10` are 1, 1, 3, and 5.

## Starter Code

```html
function sumFibs(num) {
  return num;
}

sumFibs(4);
```

## Hints

1. `sumFibs(1)` should return a number.
2. `sumFibs(1000)` should return 1785.
3. `sumFibs(4000000)` should return 4613732.
4. `sumFibs(4)` should return 5.
5. `sumFibs(75024)` should return 60696.
6. `sumFibs(75025)` should return 135721.

## Solution

```html
```js
function sumFibs(num) {
  var a = 1;
  var b = 1;
  var s = 0;
  while (a <= num) {
    if (a % 2 !== 0) {
      s += a;
    }
    a = [b, b=b+a][0];
  }
  return s;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a5229172f011153519423690*
