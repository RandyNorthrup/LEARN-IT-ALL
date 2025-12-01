---
id: lesson-006-004
title: Write Arrow Functions with Parameters
chapterId: chapter-06
order: 4
duration: 5
objectives:
  - Write Arrow Functions with Parameters
---

# Write Arrow Functions with Parameters

Just like a regular function, you can pass arguments into an arrow function.

```js
const doubler = (item) => item * 2;
doubler(4);
```

`doubler(4)` would return the value `8`.

If an arrow function has a single parameter, the parentheses enclosing the parameter may be omitted.

```js
const doubler = item => item * 2;
```

It is possible to pass more than one argument into an arrow function.

```js
const multiplier = (item, multi) => item * multi;
multiplier(4, 2);
```

`multiplier(4, 2)` would return the value `8`.

## Instructions

Rewrite the `myConcat` function which appends contents of `arr2` to `arr1` so that the function uses arrow function syntax.

## Starter Code

```html
var myConcat = function(arr1, arr2) {
  return arr1.concat(arr2);
};

console.log(myConcat([1, 2], [3, 4, 5]));
```

## Hints

1. You should replace the `var` keyword.
2. `myConcat` should be a constant variable (by using `const`).
3. `myConcat` should be an arrow function with two parameters
4. `myConcat()` should return `[1, 2, 3, 4, 5]`.
5. The `function` keyword should not be used.

## Solution

```html
```js
const myConcat = (arr1, arr2) =>  {
  return arr1.concat(arr2);
};

console.log(myConcat([1, 2], [3, 4, 5]));
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b88367417b2b2512b44*
