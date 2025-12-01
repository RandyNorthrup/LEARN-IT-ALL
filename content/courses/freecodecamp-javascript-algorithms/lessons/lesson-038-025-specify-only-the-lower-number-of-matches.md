---
id: lesson-038-025
title: Specify Only the Lower Number of Matches
chapterId: chapter-38
order: 25
duration: 5
objectives:
  - Specify Only the Lower Number of Matches
---

# Specify Only the Lower Number of Matches

You can specify the lower and upper number of patterns with quantity specifiers using curly brackets. Sometimes you only want to specify the lower number of patterns with no upper limit.

To only specify the lower number of patterns, keep the first number followed by a comma.

For example, to match only the string `hah` with the letter `a` appearing at least `3` times, your regex would be `/ha{3,}h/`.

```js
let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
multipleA.test(A4);
multipleA.test(A2);
multipleA.test(A100);
```

In order, the three `test` calls would return `true`, `false`, and `true`.

## Instructions

Change the regex `haRegex` to match the word `Hazzah` only when it has four or more letter `z`'s.

## Starter Code

```html
let haStr = "Hazzzzah";
let haRegex = /change/; // Change this line
let result = haRegex.test(haStr);
```

## Hints

1. Your regex should use curly brackets.
2. Your regex should not match the string `Hazzah`
3. Your regex should not match the string `Hazzzah`
4. Your regex should match the string `Hazzzzah`
5. Your regex should match the string `Hazzzzzah`
6. Your regex should match the string `Hazzzzzzah`
7. Your regex should match the string `Hazzah` with 30 `z`'s in it.

## Solution

```html
```js
let haStr = "Hazzzzah";
let haRegex = /Haz{4,}ah/; // Change this line
let result = haRegex.test(haStr);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db9367417b2b2512ba6*
