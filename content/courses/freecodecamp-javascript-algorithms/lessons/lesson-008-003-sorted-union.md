---
id: lesson-008-003
title: Sorted Union
chapterId: chapter-08
order: 3
duration: 5
objectives:
  - Sorted Union
---

# Sorted Union

Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

Check the assertion tests for examples.

## Starter Code

```html
function uniteUnique(arr) {
  return arr;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
```

## Hints

1. `uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])` should return `[1, 3, 2, 5, 4]`.
2. `uniteUnique([1, 2, 3], [5, 2, 1])` should return `[1, 2, 3, 5]`.
3. `uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])` should return `[1, 2, 3, 5, 4, 6, 7, 8]`.
4. `uniteUnique([1, 3, 2], [5, 4], [5, 6])` should return `[1, 3, 2, 5, 4, 6]`.
5. `uniteUnique([1, 3, 2, 3], [5, 2, 1, 4], [2, 1])` should return `[1, 3, 2, 5, 4]`.

## Solution

```html
```js
function uniteUnique(arr) {
  return [].slice.call(arguments).reduce(function(a, b) {
    return [].concat(
      a, 
      b.filter(function(e, currentIndex) {
        return b.indexOf(e) === currentIndex && a.indexOf(e) === -1;
      }));
  }, []);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a105e963526e7de52b219be9*
