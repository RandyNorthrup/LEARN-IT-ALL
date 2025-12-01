---
id: lesson-038-028
title: Positive and Negative Lookahead
chapterId: chapter-38
order: 28
duration: 5
objectives:
  - Positive and Negative Lookahead
---

# Positive and Negative Lookahead

<dfn>Lookaheads</dfn> are patterns that tell JavaScript to look-ahead in your string to check for patterns further along. This can be useful when you want to search for multiple patterns over the same string.

There are two kinds of lookaheads: <dfn>positive lookahead</dfn> and <dfn>negative lookahead</dfn>.

A positive lookahead will look to make sure the element in the search pattern is there, but won't actually match it. A positive lookahead is used as `(?=...)` where the `...` is the required part that is not matched.

On the other hand, a negative lookahead will look to make sure the element in the search pattern is not there. A negative lookahead is used as `(?!...)` where the `...` is the pattern that you do not want to be there. The rest of the pattern is returned if the negative lookahead part is not present.

Lookaheads are a bit confusing but some examples will help.

```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex);
noquit.match(qRegex);
```

Both of these `match` calls would return `["q"]`.

A more practical use of lookaheads is to check two or more patterns in one string. Here is a (naively) simple password checker that looks for between 3 and 6 characters and at least one number:

```js
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password);
```

## Instructions

Use lookaheads in the `pwRegex` to match passwords that are greater than 5 characters long, and have two consecutive digits.

## Starter Code

```html
let sampleWord = "astronaut";
let pwRegex = /change/; // Change this line
let result = pwRegex.test(sampleWord);
```

## Hints

1. Your regex should use two positive `lookaheads`.
2. Your regex should not match the string `astronaut`
3. Your regex should not match the string `banan1`
4. Your regex should match the string `bana12`
5. Your regex should match the string `abc123`
6. Your regex should not match the string `12345`
7. Your regex should match the string `8pass99`
8. Your regex should not match the string `1a2bcde`
9. Your regex should match the string `astr1on11aut`

## Solution

```html
```js
let pwRegex =  /(?=\w{6})(?=\w*\d{2})/;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dba367417b2b2512ba9*
