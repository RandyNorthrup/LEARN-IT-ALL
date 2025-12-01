---
id: lesson-038-024
title: Specify Upper and Lower Number of Matches
chapterId: chapter-38
order: 24
duration: 5
objectives:
  - Specify Upper and Lower Number of Matches
---

# Specify Upper and Lower Number of Matches

Recall that you use the plus sign `+` to look for one or more characters and the asterisk `*` to look for zero or more characters. These are convenient but sometimes you want to match a certain range of patterns.

You can specify the lower and upper number of patterns with <dfn>quantity specifiers</dfn>. Quantity specifiers are used with curly brackets (`{` and `}`). You put two numbers between the curly brackets - for the lower and upper number of patterns.

For example, to match only the letter `a` appearing between `3` and `5` times in the string `ah`, your regex would be `/a{3,5}h/`.

```js
let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;
multipleA.test(A4);
multipleA.test(A2);
```

The first `test` call would return `true`, while the second would return `false`.

## Instructions

Change the regex `ohRegex` to match the entire phrase `Oh no` only when it has `3` to `6` letter `h`'s.

## Starter Code

```html
let ohStr = "Ohhh no";
let ohRegex = /change/; // Change this line
let result = ohRegex.test(ohStr);
```

## Hints

1. Your regex should use curly brackets.
2. Your regex should not match the string `Ohh no`
3. Your regex should match the string `Ohhh no`
4. Your regex should match the string `Ohhhh no`
5. Your regex should match the string `Ohhhhh no`
6. Your regex should match the string `Ohhhhhh no`
7. Your regex should not match the string `Ohhhhhhh no`

## Solution

```html
```js
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6} no/; // Change this line
let result = ohRegex.test(ohStr);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db9367417b2b2512ba5*
