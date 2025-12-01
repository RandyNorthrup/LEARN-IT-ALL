---
id: lesson-002-008
title: Boo who
chapterId: chapter-02
order: 8
duration: 5
objectives:
  - Boo who
---

# Boo who

Check if a value is classified as a boolean primitive. Return `true` or `false`.

Boolean primitives are `true` and `false`.

## Starter Code

```html
function booWho(bool) {
  return bool;
}

booWho(null);
```

## Hints

1. `booWho(true)` should return `true`.
2. `booWho(false)` should return `true`.
3. `booWho([1, 2, 3])` should return `false`.
4. `booWho([].slice)` should return `false`.
5. `booWho({ "a": 1 })` should return `false`.
6. `booWho(1)` should return `false`.
7. `booWho(NaN)` should return `false`.
8. `booWho("a")` should return `false`.
9. `booWho("true")` should return `false`.
10. `booWho("false")` should return `false`.

## Solution

```html
```js
function booWho(bool) {
  return typeof bool === 'boolean';
}

booWho(null);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a77dbc43c33f39daa4429b4f*
