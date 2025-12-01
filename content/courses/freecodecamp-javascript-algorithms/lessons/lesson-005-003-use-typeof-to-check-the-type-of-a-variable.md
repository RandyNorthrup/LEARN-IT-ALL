---
id: lesson-005-003
title: Use typeof to Check the Type of a Variable
chapterId: chapter-05
order: 3
duration: 5
objectives:
  - Use typeof to Check the Type of a Variable
---

# Use typeof to Check the Type of a Variable

You can use `typeof` to check the data structure, or type, of a variable. This is useful in debugging when working with multiple data types. If you think you're adding two numbers, but one is actually a string, the results can be unexpected. Type errors can lurk in calculations or function calls. Be careful especially when you're accessing and working with external data in the form of a JavaScript Object Notation (JSON) object.

Here are some examples using `typeof`:

```js
console.log(typeof "");
console.log(typeof 0);
console.log(typeof []);
console.log(typeof {});
```

In order, the console will display the strings `string`, `number`, `object`, and `object`.

JavaScript recognizes seven primitive (immutable) data types: `Boolean`, `Null`, `Undefined`, `Number`, `String`, `Symbol` (new with ES6), and `BigInt` (new with ES2020), and one type for mutable items: `Object`. Note that in JavaScript, arrays are technically a type of object.

## Instructions

Add two `console.log()` statements to check the `typeof` each of the two variables `seven` and `three` in the code.

## Starter Code

```html
let seven = 7;
let three = "3";
console.log(seven + three);
// Only change code below this line
```

## Hints

1. Your code should use `typeof` in two `console.log()` statements to check the type of the variables.
2. Your code should use `typeof` to check the type of the variable `seven`.
3. Your code should use `typeof` to check the type of the variable `three`.

## Solution

```html
```js
let seven = 7;let three = "3";console.log(typeof seven);
console.log(typeof three);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b84367417b2b2512b34*
