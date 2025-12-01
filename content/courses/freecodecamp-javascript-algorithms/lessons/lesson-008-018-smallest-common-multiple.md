---
id: lesson-008-018
title: Smallest Common Multiple
chapterId: chapter-08
order: 18
duration: 5
objectives:
  - Smallest Common Multiple
---

# Smallest Common Multiple

Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers *between* 1 and 3. The answer here would be 6.

## Starter Code

```html
function smallestCommons(arr) {
  return arr;
}

smallestCommons([1,5]);
```

## Hints

1. `smallestCommons([1, 5])` should return a number.
2. `smallestCommons([1, 5])` should return 60.
3. `smallestCommons([5, 1])` should return 60.
4. `smallestCommons([2, 10])` should return 2520.
5. `smallestCommons([1, 13])` should return 360360.
6. `smallestCommons([23, 18])` should return 6056820.

## Solution

```html
```js
function gcd(a, b) {
    while (b !== 0) {
        a = [b, b = a % b][0];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function smallestCommons(arr) {
  arr.sort(function(a,b) {return a-b;});
  var rng = [];
  for (var i = arr[0]; i <= arr[1]; i++) {
    rng.push(i);
  }
  return rng.reduce(lcm);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: ae9defd7acaf69703ab432ea*
