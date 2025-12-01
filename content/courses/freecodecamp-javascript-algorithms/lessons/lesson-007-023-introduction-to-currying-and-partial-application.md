---
id: lesson-007-023
title: Introduction to Currying and Partial Application
chapterId: chapter-07
order: 23
duration: 5
objectives:
  - Introduction to Currying and Partial Application
---

# Introduction to Currying and Partial Application

The <dfn>arity</dfn> of a function is the number of arguments it requires. <dfn>Currying</dfn> a function means to convert a function of N arity into N functions of arity 1.

In other words, it restructures a function so it takes one argument, then returns another function that takes the next argument, and so on.

Here's an example:

```js
function unCurried(x, y) {
  return x + y;
}

function curried(x) {
  return function(y) {
    return x + y;
  }
}

const curried = x => y => x + y

curried(1)(2)
```

`curried(1)(2)` would return `3`.

This is useful in your program if you can't supply all the arguments to a function at one time. You can save each function call into a variable, which will hold the returned function reference that takes the next argument when it's available. Here's an example using the curried function in the example above:

```js
const funcForY = curried(1);
console.log(funcForY(2)); // 3
```

Similarly, <dfn>partial application</dfn> can be described as applying a few arguments to a function at a time and returning another function that is applied to more arguments. Here's an example:

```js
function impartial(x, y, z) {
  return x + y + z;
}

const partialFn = impartial.bind(this, 1, 2);
partialFn(10); // 13
```

## Instructions

Fill in the body of the `add` function so it uses currying to add parameters `x`, `y`, and `z`.

## Starter Code

```html
function add(x) {
  // Only change code below this line


  // Only change code above this line
}

add(10)(20)(30);
```

## Hints

1. `add(10)(20)(30)` should return `60`.
2. `add(1)(2)(3)` should return `6`.
3. `add(11)(22)(33)` should return `66`.
4. Your code should include a final statement that returns `x + y + z`.

## Solution

```html
```js
const add = x => y => z => x + y + z
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dab367417b2b2512b70*
