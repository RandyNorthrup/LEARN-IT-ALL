---
id: lesson-038-016
title: Match Beginning String Patterns
chapterId: chapter-38
order: 16
duration: 5
objectives:
  - Match Beginning String Patterns
---

# Match Beginning String Patterns

Prior challenges showed that regular expressions can be used to look for a number of matches. They are also used to search for patterns in specific positions in strings.

In an earlier challenge, you used the caret character (`^`) inside a character set to create a negated character set in the form `[^thingsThatWillNotBeMatched]`. Outside of a character set, the caret is used to search for patterns at the beginning of strings.

```js
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
```

The first `test` call would return `true`, while the second would return `false`.

## Instructions

Use the caret character in a regex to find `Cal` only in the beginning of the string `rickyAndCal`.

## Starter Code

```html
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /change/; // Change this line
let result = calRegex.test(rickyAndCal);
```

## Hints

1. Your regex should search for the string `Cal` with a capital letter.
2. Your regex should not use any flags.
3. Your regex should match the string `Cal` at the beginning of the string.
4. Your regex should not match the string `Cal` in the middle of a string.

## Solution

```html
```js
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /^Cal/; // Change this line
let result = calRegex.test(rickyAndCal);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db7367417b2b2512b9d*
