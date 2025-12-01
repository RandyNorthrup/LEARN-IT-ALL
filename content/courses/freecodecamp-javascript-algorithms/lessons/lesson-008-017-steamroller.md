---
id: lesson-008-017
title: Steamroller
chapterId: chapter-08
order: 17
duration: 5
objectives:
  - Steamroller
---

# Steamroller

Flatten a nested array. You must account for varying levels of nesting.

## Starter Code

```html
function steamrollArray(arr) {
  return arr;
}

steamrollArray([1, [2], [3, [[4]]]]);
```

## Hints

1. `steamrollArray([[["a"]], [["b"]]])` should return `["a", "b"]`.
2. `steamrollArray([1, [2], [3, [[4]]]])` should return `[1, 2, 3, 4]`.
3. `steamrollArray([1, [], [3, [[4]]]])` should return `[1, 3, 4]`.
4. `steamrollArray([1, {}, [3, [[4]]]])` should return `[1, {}, 3, 4]`.
5. Your solution should not use the `Array.prototype.flat()` or `Array.prototype.flatMap()` methods.
6. Global variables should not be used.

## Solution

```html
```js
function steamrollArray(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  var out = [];
  arr.forEach(function(e) {
    steamrollArray(e).forEach(function(v) {
      out.push(v);
    });
  });
  return out;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: ab306dbdcc907c7ddfc30830*
