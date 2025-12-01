---
id: lesson-038-009
title: Match Letters of the Alphabet
chapterId: chapter-38
order: 9
duration: 5
objectives:
  - Match Letters of the Alphabet
---

# Match Letters of the Alphabet

You saw how you can use <dfn>character sets</dfn> to specify a group of characters to match, but that's a lot of typing when you need to match a large range of characters (for example, every letter in the alphabet). Fortunately, there is a built-in feature that makes this short and simple.

Inside a character set, you can define a range of characters to match using a hyphen character: `-`.

For example, to match lowercase letters `a` through `e` you would use `[a-e]`.

```js
let catStr = "cat";
let batStr = "bat";
let matStr = "mat";
let bgRegex = /[a-e]at/;
catStr.match(bgRegex);
batStr.match(bgRegex);
matStr.match(bgRegex);
```

In order, the three `match` calls would return the values `["cat"]`, `["bat"]`, and `null`.

## Instructions

Match all the letters in the string `quoteSample`.

**Note**: Be sure to match both uppercase and lowercase letters.

## Starter Code

```html
let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /change/; // Change this line
let result = alphabetRegex; // Change this line
```

## Hints

1. Your regex `alphabetRegex` should match 35 items.
2. Your regex `alphabetRegex` should use the global flag.
3. Your regex `alphabetRegex` should use the case insensitive flag.

## Solution

```html
```js
let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi; // Change this line
let result = quoteSample.match(alphabetRegex); // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db5367417b2b2512b96*
