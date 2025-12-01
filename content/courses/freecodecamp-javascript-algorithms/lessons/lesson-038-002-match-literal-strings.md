---
id: lesson-038-002
title: Match Literal Strings
chapterId: chapter-38
order: 2
duration: 5
objectives:
  - Match Literal Strings
---

# Match Literal Strings

In the last challenge, you searched for the word `Hello` using the regular expression `/Hello/`. That regex searched for a literal match of the string `Hello`. Here's another example searching for a literal match of the string `Kevin`:

```js
let testStr = "Hello, my name is Kevin.";
let testRegex = /Kevin/;
testRegex.test(testStr);
```

This `test` call will return `true`.

Any other forms of `Kevin` will not match. For example, the regex `/Kevin/` will not match `kevin` or `KEVIN`.

```js
let wrongRegex = /kevin/;
wrongRegex.test(testStr);
```

This `test` call will return `false`.

A future challenge will show how to match those other forms as well.

## Instructions

Complete the regex `waldoRegex` to find `"Waldo"` in the string `waldoIsHiding` with a literal match.

## Starter Code

```html
let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
let waldoRegex = /search/; // Change this line
let result = waldoRegex.test(waldoIsHiding);
```

## Hints

1. Your regex `waldoRegex` should find the string `Waldo`
2. Your regex `waldoRegex` should not search for anything else.
3. You should perform a literal string match with your regex.

## Solution

```html
```js
let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
let waldoRegex = /Waldo/; // Change this line
let result = waldoRegex.test(waldoIsHiding);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db3367417b2b2512b8f*
