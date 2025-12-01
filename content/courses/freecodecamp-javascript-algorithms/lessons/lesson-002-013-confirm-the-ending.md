---
id: lesson-002-013
title: Confirm the Ending
chapterId: chapter-02
order: 13
duration: 5
objectives:
  - Confirm the Ending
---

# Confirm the Ending

Check if a string (first argument, `str`) ends with the given target string (second argument, `target`).

This challenge _can_ be solved with the `.endsWith()` method, which was introduced in ES2015. But for the purpose of this challenge, we would like you to use one of the JavaScript substring methods instead.

## Starter Code

```html
function confirmEnding(str, target) {
  return str;
}

confirmEnding('Bastian', 'n');
```

## Hints

1. `confirmEnding("Bastian", "n")` should return `true`.
2. `confirmEnding("Congratulation", "on")` should return `true`.
3. `confirmEnding("Connor", "n")` should return `false`.
4. `confirmEnding("Walking on water and developing software from a specification are easy if both are frozen", "specification")` should return `false`.
5. `confirmEnding("He has to give me a new name", "name")` should return `true`.
6. `confirmEnding("Open sesame", "same")` should return `true`.
7. `confirmEnding("Open sesame", "sage")` should return `false`.
8. `confirmEnding("Open sesame", "game")` should return `false`.
9. `confirmEnding("If you want to save our world, you must hurry. We dont know how much longer we can withstand the nothing", "mountain")` should return `false`.
10. `confirmEnding("Abstraction", "action")` should return `true`.
11. Your code should not use the built-in method `.endsWith()` to solve the challenge.

## Solution

```html
```js
function confirmEnding(str, target) {
  return str.substring(str.length - target.length) === target;
}

confirmEnding('Bastian', 'n');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: acda2fb1324d9b0fa741e6b5*
