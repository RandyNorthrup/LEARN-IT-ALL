---
id: lesson-038-004
title: Ignore Case While Matching
chapterId: chapter-38
order: 4
duration: 5
objectives:
  - Ignore Case While Matching
---

# Ignore Case While Matching

Up until now, you've looked at regexes to do literal matches of strings. But sometimes, you might want to also match case differences.

Case (or sometimes letter case) is the difference between uppercase letters and lowercase letters. Examples of uppercase are `A`, `B`, and `C`. Examples of lowercase are `a`, `b`, and `c`.

You can match both cases using what is called a flag. There are other flags but here you'll focus on the flag that ignores case - the `i` flag. You can use it by appending it to the regex. An example of using this flag is `/ignorecase/i`. This regex can match the strings `ignorecase`, `igNoreCase`, and `IgnoreCase`.

## Instructions

Write a regex `fccRegex` to match `freeCodeCamp`, no matter its case. Your regex should not match any abbreviations or variations with spaces.

## Starter Code

```html
let myString = "freeCodeCamp";
let fccRegex = /change/; // Change this line
let result = fccRegex.test(myString);
```

## Hints

1. Your regex should match the string `freeCodeCamp`
2. Your regex should match the string `FreeCodeCamp`
3. Your regex should match the string `FreecodeCamp`
4. Your regex should match the string `FreeCodecamp`
5. Your regex should not match the string `Free Code Camp`
6. Your regex should match the string `FreeCOdeCamp`
7. Your regex should not match the string `FCC`
8. Your regex should match the string `FrEeCoDeCamp`
9. Your regex should match the string `FrEeCodECamp`
10. Your regex should match the string `FReeCodeCAmp`

## Solution

```html
```js
let myString = "freeCodeCamp";
let fccRegex = /freecodecamp/i; // Change this line
let result = fccRegex.test(myString);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db4367417b2b2512b91*
