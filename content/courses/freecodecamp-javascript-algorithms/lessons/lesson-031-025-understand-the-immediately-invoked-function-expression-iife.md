---
id: lesson-031-025
title: Understand the Immediately Invoked Function Expression (IIFE)
chapterId: chapter-31
order: 25
duration: 5
objectives:
  - Understand the Immediately Invoked Function Expression (IIFE)
---

# Understand the Immediately Invoked Function Expression (IIFE)

A common pattern in JavaScript is to execute a function as soon as it is declared:

```js
(function () {
  console.log("Chirp, chirp!");
})();
```

This is an anonymous function expression that executes right away, and outputs `Chirp, chirp!` immediately.

Note that the function has no name and is not stored in a variable. The two parentheses () at the end of the function expression cause it to be immediately executed or invoked. This pattern is known as an <dfn>immediately invoked function expression</dfn> or <dfn>IIFE</dfn>.

## Instructions

Rewrite the function `makeNest` and remove its call so instead it's an anonymous immediately invoked function expression (IIFE).

## Starter Code

```html
function makeNest() {
  console.log("A cozy nest is ready");
}

makeNest();
```

## Hints

1. The function should be anonymous.
2. Your function should have parentheses at the end of the expression to call it immediately.

## Solution

```html
```js
(function () {
  console.log("A cozy nest is ready");
})();
```

---

```js
(function () {
  console.log("A cozy nest is ready");
}());
```

---

```js
(() => {
  console.log("A cozy nest is ready");
})();
```

---

```js
(() =>
  console.log("A cozy nest is ready")
)();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db2367417b2b2512b8b*
