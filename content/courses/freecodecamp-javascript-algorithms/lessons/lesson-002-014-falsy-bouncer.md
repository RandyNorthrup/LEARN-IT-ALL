---
id: lesson-002-014
title: Falsy Bouncer
chapterId: chapter-02
order: 14
duration: 5
objectives:
  - Falsy Bouncer
---

# Falsy Bouncer

Remove all falsy values from an array. Return a new array; do not mutate the original array.

Falsy values in JavaScript are `false`, `null`, `0`, `""`, `undefined`, and `NaN`.

Hint: Try converting each value to a Boolean.

## Starter Code

```html
function bouncer(arr) {
  return arr;
}

bouncer([7, 'ate', '', false, 9]);
```

## Hints

1. `bouncer([7, "ate", "", false, 9])` should return `[7, "ate", 9]`.
2. `bouncer(["a", "b", "c"])` should return `["a", "b", "c"]`.
3. `bouncer([false, null, 0, NaN, undefined, ""])` should return `[]`.
4. `bouncer([null, NaN, 1, 2, undefined])` should return `[1, 2]`.
5. You should not mutate `arr`.

## Solution

```html
```js
function bouncer(arr) {
  return arr.filter(e => e);
}

bouncer([7, 'ate', '', false, 9]);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: adf08ec01beb4f99fc7a68f2*
