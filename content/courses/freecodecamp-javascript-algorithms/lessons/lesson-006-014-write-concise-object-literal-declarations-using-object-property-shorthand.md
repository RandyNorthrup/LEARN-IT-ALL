---
id: lesson-006-014
title: Write Concise Object Literal Declarations Using Object Property Shorthand
chapterId: chapter-06
order: 14
duration: 5
objectives:
  - Write Concise Object Literal Declarations Using Object Property Shorthand
---

# Write Concise Object Literal Declarations Using Object Property Shorthand

ES6 adds some nice support for easily defining object literals.

Consider the following code:

```js
const getMousePosition = (x, y) => ({
  x: x,
  y: y
});
```

`getMousePosition` is a simple function that returns an object containing two properties. ES6 provides the syntactic sugar to eliminate the redundancy of having to write `x: x`. You can simply write `x` once, and it will be converted to`x: x` (or something equivalent) under the hood. Here is the same function from above rewritten to use this new syntax:

```js
const getMousePosition = (x, y) => ({ x, y });
```

## Instructions

Use object property shorthand with object literals to create and return an object with `name`, `age` and `gender` properties.

## Starter Code

```html
const createPerson = (name, age, gender) => {
  // Only change code below this line
  return {
    name: name,
    age: age,
    gender: gender
  };
  // Only change code above this line
};
```

## Hints

1. `createPerson("Zodiac Hasbro", 56, "male")` should return `{name: "Zodiac Hasbro", age: 56, gender: "male"}`.
2. Your code should not use `key:value`.

## Solution

```html
```js
const createPerson = (name, age, gender) => {
  // Only change code below this line
  /*return {
    name: name,
    age: age,
    gender: gender
  };*/
  return {
    name,
    age,
    gender
  };
  // Only change code above this line
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8a367417b2b2512b4f*
