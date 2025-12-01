---
id: lesson-038-015
title: Find One or More Criminals in a Hunt
chapterId: chapter-38
order: 15
duration: 5
objectives:
  - Find One or More Criminals in a Hunt
---

# Find One or More Criminals in a Hunt

Time to pause and test your new regex writing skills. A group of criminals escaped from jail and ran away, but you don't know how many. However, you do know that they stay close together when they are around other people. You are responsible for finding all of the criminals at once.

Here's an example to review how to do this:

The regex `/z+/` matches the letter `z` when it appears one or more times in a row. It would find matches in all of the following strings:

```js
"z"
"zzzzzz"
"ABCzzzz"
"zzzzABC"
"abczzzzzzzzzzzzzzzzzzzzzabc"
```

But it does not find matches in the following strings since there are no letter `z` characters:

```js
""
"ABC"
"abcabc"
```

## Instructions

Write a greedy regex that finds one or more criminals within a group of other people. A criminal is represented by the capital letter `C`.

## Starter Code

```html
let reCriminals = /./; // Change this line
```

## Hints

1. Your regex should match one criminal (`C`) in the string `C`
2. Your regex should match two criminals (`CC`) in the string `CC`
3. Your regex should match three criminals (`CCC`) in the string `P1P5P4CCCcP2P6P3`.
4. Your regex should match five criminals (`CCCCC`) in the string `P6P2P7P4P5CCCCCP3P1`
5. Your regex should not match any criminals in the empty string `""`
6. Your regex should not match any criminals in the string `P1P2P3`
7. Your regex should match fifty criminals (`CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC`) in the string `P2P1P5P4CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCP3`.

## Solution

```html
```js
let reCriminals = /C+/; // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db7367417b2b2512b9c*
