---
id: lesson-003-010
title: Combine Arrays with the Spread Operator
chapterId: chapter-03
order: 10
duration: 5
objectives:
  - Combine Arrays with the Spread Operator
---

# Combine Arrays with the Spread Operator

Another huge advantage of the <dfn>spread</dfn> operator is the ability to combine arrays, or to insert all the elements of one array into another, at any index. With more traditional syntaxes, we can concatenate arrays, but this only allows us to combine arrays at the end of one, and at the start of another. Spread syntax makes the following operation extremely simple:

```js
let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];

let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
```

`thatArray` would have the value `['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']`.

Using spread syntax, we have just achieved an operation that would have been more complex and more verbose had we used traditional methods.

## Instructions

We have defined a function `spreadOut` that returns the variable `sentence`. Modify the function using the <dfn>spread</dfn> operator so that it returns the array `['learning', 'to', 'code', 'is', 'fun']`.

## Starter Code

```html
function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence; // Change this line
  return sentence;
}

console.log(spreadOut());
```

## Hints

1. `spreadOut` should return `["learning", "to", "code", "is", "fun"]`
2. The `spreadOut` function should utilize spread syntax

## Solution

```html
```js
function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ['learning', ...fragment, 'is', 'fun'];
  return sentence;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7b367417b2b2512b17*
