---
id: lesson-006-024
title: Create a JavaScript Promise
chapterId: chapter-06
order: 24
duration: 5
objectives:
  - Create a JavaScript Promise
---

# Create a JavaScript Promise

A promise in JavaScript is exactly what it sounds like - you use it to make a promise to do something, usually asynchronously. When the task completes, you either fulfill your promise or fail to do so. `Promise` is a constructor function, so you need to use the `new` keyword to create one. It takes a function, as its argument, with two parameters - `resolve` and `reject`. These are methods used to determine the outcome of the promise. The syntax looks like this:

```js
const myPromise = new Promise((resolve, reject) => {

});
```

## Instructions

Create a new promise called `makeServerRequest`. Pass in a function with `resolve` and `reject` parameters to the constructor.

## Hints

1. You should assign a promise to a declared variable named `makeServerRequest`.
2. Your promise should receive a function with `resolve` and `reject` as parameters.

## Solution

```html
```js
const makeServerRequest = new Promise((resolve, reject) => {

});
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5cdafbb0291309899753167f*
