---
id: lesson-038-011
title: Match Single Characters Not Specified
chapterId: chapter-38
order: 11
duration: 5
objectives:
  - Match Single Characters Not Specified
---

# Match Single Characters Not Specified

So far, you have created a set of characters that you want to match, but you could also create a set of characters that you do not want to match. These types of character sets are called <dfn>negated character sets</dfn>.

To create a negated character set, you place a caret character (`^`) after the opening bracket and before the characters you do not want to match.

For example, `/[^aeiou]/gi` matches all characters that are not a vowel. Note that characters like `.`, `!`, `[`, `@`, `/` and white space are matched - the negated vowel character set only excludes the vowel characters.

## Instructions

Create a single regex that matches all characters that are not a number or a vowel. Remember to include the appropriate flags in the regex.

## Starter Code

```html
let quoteSample = "3 blind mice.";
let myRegex = /change/; // Change this line
let result = myRegex; // Change this line
```

## Hints

1. Your regex `myRegex` should match 9 items.
2. Your regex `myRegex` should use the global flag.
3. Your regex `myRegex` should use the case insensitive flag.

## Solution

```html
```js
let quoteSample = "3 blind mice.";
let myRegex = /[^0-9aeiou]/gi; // Change this line
let result = quoteSample.match(myRegex); // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db6367417b2b2512b98*
