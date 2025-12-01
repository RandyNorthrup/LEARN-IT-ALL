---
id: lesson-005-008
title: Catch Missing Open and Closing Parenthesis After a Function Call
chapterId: chapter-05
order: 8
duration: 5
objectives:
  - Catch Missing Open and Closing Parenthesis After a Function Call
---

# Catch Missing Open and Closing Parenthesis After a Function Call

When a function or method doesn't take any arguments, you may forget to include the (empty) opening and closing parentheses when calling it. Often times the result of a function call is saved in a variable for other use in your code. This error can be detected by logging variable values (or their types) to the console and seeing that one is set to a function reference, instead of the expected value the function returns.

The variables in the following example are different:

```js
function myFunction() {
  return "You rock!";
}
let varOne = myFunction;
let varTwo = myFunction();
```

Here `varOne` is the function `myFunction`, and `varTwo` is the string `You rock!`.

## Instructions

Fix the code so the variable `result` is set to the value returned from calling the function `getNine`.

## Starter Code

```html
function getNine() {
  let x = 6;
  let y = 3;
  return x + y;
}

let result = getNine;
console.log(result);
```

## Hints

1. Your code should fix the variable `result` so it is set to the number that the function `getNine` returns.
2. Your code should call the `getNine` function.

## Solution

```html
```js
function getNine() {
 let x = 6;
 let y = 3;
 return x + y;
}

let result = getNine();
console.log(result);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b85367417b2b2512b39*
