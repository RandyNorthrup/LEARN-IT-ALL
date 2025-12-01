---
id: lesson-008-006
title: Sum All Numbers in a Range
chapterId: chapter-08
order: 6
duration: 5
objectives:
  - Sum All Numbers in a Range
---

# Sum All Numbers in a Range

We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.

For example, `sumAll([4,1])` should return `10` because sum of all the numbers between 1 and 4 (both inclusive) is `10`.

## Starter Code

```html
function sumAll(arr) {
  return 1;
}

sumAll([1, 4]);
```

## Hints

1. `sumAll([1, 4])` should return a number.
2. `sumAll([1, 4])` should return 10.
3. `sumAll([4, 1])` should return 10.
4. `sumAll([5, 10])` should return 45.
5. `sumAll([10, 5])` should return 45.

## Solution

```html
```js
function sumAll(arr) {
  var sum = 0;
  arr.sort(function(a,b) {return a-b;});
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
