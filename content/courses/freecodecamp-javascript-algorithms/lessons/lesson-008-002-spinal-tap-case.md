---
id: lesson-008-002
title: Spinal Tap Case
chapterId: chapter-08
order: 2
duration: 5
objectives:
  - Spinal Tap Case
---

# Spinal Tap Case

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

## Starter Code

```html
function spinalCase(str) {
  return str;
}

spinalCase('This Is Spinal Tap');
```

## Hints

1. `spinalCase("This Is Spinal Tap")` should return the string `this-is-spinal-tap`.
2. `spinalCase("thisIsSpinalTap")` should return the string `this-is-spinal-tap`.
3. `spinalCase("The_Andy_Griffith_Show")` should return the string `the-andy-griffith-show`.
4. `spinalCase("Teletubbies say Eh-oh")` should return the string `teletubbies-say-eh-oh`.
5. `spinalCase("AllThe-small Things")` should return the string `all-the-small-things`.

## Solution

```html
```js
function spinalCase(str) {
  str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  return str.toLowerCase().replace(/\ |\_/g, '-');
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a103376db3ba46b2d50db289*
