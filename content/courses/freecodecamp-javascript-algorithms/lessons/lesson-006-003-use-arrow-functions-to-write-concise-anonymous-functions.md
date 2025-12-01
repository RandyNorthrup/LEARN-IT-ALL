---
id: lesson-006-003
title: Use Arrow Functions to Write Concise Anonymous Functions
chapterId: chapter-06
order: 3
duration: 5
objectives:
  - Use Arrow Functions to Write Concise Anonymous Functions
---

# Use Arrow Functions to Write Concise Anonymous Functions

In JavaScript, we often don't need to name our functions, especially when passing a function as an argument to another function. Instead, we create inline functions. We don't need to name these functions because we do not reuse them anywhere else.

To achieve this, we often use the following syntax:

```js
const myFunc = function() {
  const myVar = "value";
  return myVar;
}
```

ES6 provides us with the syntactic sugar to not have to write anonymous functions this way. Instead, you can use **arrow function syntax**:

```js
const myFunc = () => {
  const myVar = "value";
  return myVar;
}
```

When there is no function body, and only a return value, arrow function syntax allows you to omit the keyword `return` as well as the brackets surrounding the code. This helps simplify smaller functions into one-line statements:

```js
const myFunc = () => "value";
```

This code will still return the string `value` by default.

## Instructions

Rewrite the function assigned to the variable `magic` which returns a `new Date()` to use arrow function syntax. Also, make sure nothing is defined using the keyword `var`.

## Starter Code

```html
var magic = function() {
  return new Date();
};
```

## Hints

1. You should replace the `var` keyword.
2. `magic` should be a constant variable (by using `const`).
3. `magic` should be a `function`.
4. `magic()` should return the correct date.
5. The `function` keyword should not be used.

## Solution

```html
```js
const magic = () => {
  return new Date();
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b87367417b2b2512b43*
