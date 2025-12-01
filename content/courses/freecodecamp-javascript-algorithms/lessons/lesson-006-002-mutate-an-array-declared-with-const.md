---
id: lesson-006-002
title: Mutate an Array Declared with const
chapterId: chapter-06
order: 2
duration: 5
objectives:
  - Mutate an Array Declared with const
---

# Mutate an Array Declared with const

If you are unfamiliar with `const`, check out <a href="/learn/javascript-algorithms-and-data-structures/basic-javascript/declare-a-read-only-variable-with-the-const-keyword" target="_blank" rel="noopener noreferrer nofollow">this challenge about the <code>const</code> keyword</a>.

The `const` declaration has many use cases in modern JavaScript.

Some developers prefer to assign all their variables using `const` by default, unless they know they will need to reassign the value. Only in that case, they use `let`.

However, it is important to understand that objects (including arrays and functions) assigned to a variable using `const` are still mutable. Using the `const` declaration only prevents reassignment of the variable identifier.

```js
const s = [5, 6, 7];
s = [1, 2, 3];
s[2] = 45;
console.log(s);
```

`s = [1, 2, 3]` will result in an error. After commenting out that line, the `console.log` will display the value `[5, 6, 45]`.

As you can see, you can mutate the object `[5, 6, 7]` itself and the variable `s` will still point to the altered array `[5, 6, 45]`. Like all arrays, the array elements in `s` are mutable, but because `const` was used, you cannot use the variable identifier `s` to point to a different array using the assignment operator.

## Instructions

An array is declared as `const s = [5, 7, 2]`. Change the array to `[2, 5, 7]` using various element assignments.

## Starter Code

```html
const s = [5, 7, 2];
function editInPlace() {
  // Only change code below this line

  // Using s = [2, 5, 7] would be invalid

  // Only change code above this line
}
editInPlace();
```

## Hints

1. You should not replace `const` keyword.
2. `s` should be a constant variable (by using `const`).
3. You should not change the original array declaration.
4. `s` should be equal to `[2, 5, 7]`.

## Solution

```html
```js
const s = [5, 7, 2];
function editInPlace() {
  s[0] = 2;
  s[1] = 5;
  s[2] = 7;
}
editInPlace();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b87367417b2b2512b42*
