---
id: lesson-002-006
title: Factorialize a Number
chapterId: chapter-02
order: 6
duration: 5
objectives:
  - Factorialize a Number
---

# Factorialize a Number

Return the factorial of the provided integer.

If the integer is represented with the letter `n`, a factorial is the product of all positive integers less than or equal to `n`.

Factorials are often represented with the shorthand notation `n!`

For example: `5! = 1 * 2 * 3 * 4 * 5 = 120`

Only integers greater than or equal to zero will be supplied to the function.

## Starter Code

```html
function factorialize(num) {
  return num;
}

factorialize(5);
```

## Hints

1. `factorialize(5)` should return a number.
2. `factorialize(5)` should return `120`.
3. `factorialize(10)` should return `3628800`.
4. `factorialize(20)` should return `2432902008176640000`.
5. `factorialize(0)` should return `1`.

## Solution

```html
```js
function factorialize(num) {
  return num < 1 ? 1 : num * factorialize(num - 1);
}

factorialize(5);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a302f7aae1aa3152a5b413bc*
