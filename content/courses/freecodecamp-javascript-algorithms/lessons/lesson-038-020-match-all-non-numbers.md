---
id: lesson-038-020
title: Match All Non-Numbers
chapterId: chapter-38
order: 20
duration: 5
objectives:
  - Match All Non-Numbers
---

# Match All Non-Numbers

The last challenge showed how to search for digits using the shortcut `\d` with a lowercase `d`. You can also search for non-digits using a similar shortcut that uses an uppercase `D` instead.

The shortcut to look for non-digit characters is `\D`. This is equal to the character class `[^0-9]`, which looks for a single character that is not a number between zero and nine.

## Instructions

Use the shorthand character class for non-digits `\D` to count how many non-digits are in movie titles.

## Starter Code

```html
let movieName = "2001: A Space Odyssey";
let noNumRegex = /change/; // Change this line
let result = movieName.match(noNumRegex).length;
```

## Hints

1. Your regex should use the shortcut character to match non-digit characters
2. Your regex should use the global flag.
3. Your regex should find no non-digits in the string `9`.
4. Your regex should find 6 non-digits in the string `Catch 22`.
5. Your regex should find 11 non-digits in the string `101 Dalmatians`.
6. Your regex should find 15 non-digits in the string `One, Two, Three`.
7. Your regex should find 12 non-digits in the string `21 Jump Street`.
8. Your regex should find 17 non-digits in the string `2001: A Space Odyssey`.

## Solution

```html
```js
let movieName = "2001: A Space Odyssey";
let noNumRegex = /\D/g; // Change this line
let result = movieName.match(noNumRegex).length;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db8367417b2b2512ba1*
