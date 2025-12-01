---
id: lesson-002-010
title: Chunky Monkey
chapterId: chapter-02
order: 10
duration: 5
objectives:
  - Chunky Monkey
---

# Chunky Monkey

Write a function that splits an array (first argument) into groups the length of `size` (second argument) and returns them as a two-dimensional array.

## Starter Code

```html
function chunkArrayInGroups(arr, size) {
  return arr;
}

chunkArrayInGroups(['a', 'b', 'c', 'd'], 2);
```

## Hints

1. `chunkArrayInGroups(["a", "b", "c", "d"], 2)` should return `[["a", "b"], ["c", "d"]]`.
2. `chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3)` should return `[[0, 1, 2], [3, 4, 5]]`.
3. `chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2)` should return `[[0, 1], [2, 3], [4, 5]]`.
4. `chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4)` should return `[[0, 1, 2, 3], [4, 5]]`.
5. `chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3)` should return `[[0, 1, 2], [3, 4, 5], [6]]`.
6. `chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4)` should return `[[0, 1, 2, 3], [4, 5, 6, 7], [8]]`.
7. `chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2)` should return `[[0, 1], [2, 3], [4, 5], [6, 7], [8]]`.

## Solution

```html
```js
function chunkArrayInGroups(arr, size) {
  let out = [];

  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }

  return out;
}

chunkArrayInGroups(['a', 'b', 'c', 'd'], 2);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a9bd25c716030ec90084d8a1*
