---
id: lesson-002-015
title: Mutations
chapterId: chapter-02
order: 15
duration: 5
objectives:
  - Mutations
---

# Mutations

Return `true` if the string in the first element of the array contains all of the letters of the string in the second element of the array.

For example, `["hello", "Hello"]`, should return `true` because all of the letters in the second string are present in the first, ignoring case.

The arguments `["hello", "hey"]` should return `false` because the string `hello` does not contain a `y`.

Lastly, `["Alien", "line"]`, should return `true` because all of the letters in `line` are present in `Alien`.

## Starter Code

```html
function mutation(arr) {
  return arr;
}

mutation(['hello', 'hey']);
```

## Hints

1. `mutation(["hello", "hey"])` should return `false`.
2. `mutation(["hello", "Hello"])` should return `true`.
3. `mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"])` should return `true`.
4. `mutation(["Mary", "Army"])` should return `true`.
5. `mutation(["Mary", "Aarmy"])` should return `true`.
6. `mutation(["Alien", "line"])` should return `true`.
7. `mutation(["floor", "for"])` should return `true`.
8. `mutation(["hello", "neo"])` should return `false`.
9. `mutation(["voodoo", "no"])` should return `false`.
10. `mutation(["ate", "date"])` should return `false`.
11. `mutation(["Tiger", "Zebra"])` should return `false`.
12. `mutation(["Noel", "Ole"])` should return `true`.

## Solution

```html
```js
function mutation(arr) {
  let hash = Object.create(null);

  arr[0]
    .toLowerCase()
    .split('')
    .forEach(c => (hash[c] = true));

  return !arr[1]
    .toLowerCase()
    .split('')
    .filter(c => !hash[c]).length;
}

mutation(['hello', 'hey']);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: af2170cad53daa0770fabdea*
