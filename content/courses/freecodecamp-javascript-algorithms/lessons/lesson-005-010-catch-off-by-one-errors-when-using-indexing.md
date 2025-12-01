---
id: lesson-005-010
title: Catch Off By One Errors When Using Indexing
chapterId: chapter-05
order: 10
duration: 5
objectives:
  - Catch Off By One Errors When Using Indexing
---

# Catch Off By One Errors When Using Indexing

<dfn>Off by one errors</dfn> (sometimes called OBOE) crop up when you're trying to target a specific index of a string or array (to slice or access a segment), or when looping over the indices of them. JavaScript indexing starts at zero, not one, which means the last index is always one less than the length of the item. If you try to access an index equal to the length, the program may throw an "index out of range" reference error or print `undefined`.

When you use string or array methods that take index ranges as arguments, it helps to read the documentation and understand if they are inclusive (the item at the given index is part of what's returned) or not. Here are some examples of off by one errors:

```js
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let len = alphabet.length;
for (let i = 0; i <= len; i++) {
  console.log(alphabet[i]);
}
for (let j = 1; j < len; j++) {
  console.log(alphabet[j]);
}
for (let k = 0; k < len; k++) {
  console.log(alphabet[k]);
}
```

The first example here loops one too many times, and the second loops one too few times (missing the first index, 0). The third example is correct.

## Instructions

Fix the two indexing errors in the following function so all the numbers 1 through 5 are printed to the console.

## Starter Code

```html
function countToFive() {
  let firstFive = "12345";
  let len = firstFive.length;
  // Only change code below this line
  for (let i = 1; i <= len; i++) {
  // Only change code above this line
    console.log(firstFive[i]);
  }
}

countToFive();
```

## Hints

1. Your code should set the initial condition of the loop so it starts at the first index.
2. Your code should fix the initial condition of the loop so that the index starts at 0.
3. Your code should set the terminal condition of the loop so it stops at the last index.
4. Your code should fix the terminal condition of the loop so that it stops at 1 before the length.

## Solution

```html
```js
function countToFive() {
 let firstFive = "12345";
 let len = firstFive.length;
 // Only change code below this line
 for (let i = 0; i < len; i++) {
 // Only change code above this line
   console.log(firstFive[i]);
 }
}

countToFive();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b86367417b2b2512b3b*
