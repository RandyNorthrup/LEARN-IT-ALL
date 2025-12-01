---
id: lesson-038-010
title: Match Numbers and Letters of the Alphabet
chapterId: chapter-38
order: 10
duration: 5
objectives:
  - Match Numbers and Letters of the Alphabet
---

# Match Numbers and Letters of the Alphabet

Using the hyphen (`-`) to match a range of characters is not limited to letters. It also works to match a range of numbers.

For example, `/[0-5]/` matches any number between `0` and `5`, including the `0` and `5`.

Also, it is possible to combine a range of letters and numbers in a single character set.

```js
let jennyStr = "Jenny8675309";
let myRegex = /[a-z0-9]/ig;
jennyStr.match(myRegex);
```

## Instructions

Create a single regex that matches a range of letters between `h` and `s`, and a range of numbers between `2` and `6`. Remember to include the appropriate flags in the regex.

## Starter Code

```html
let quoteSample = "Blueberry 3.141592653s are delicious.";
let myRegex = /change/; // Change this line
let result = myRegex; // Change this line
```

## Hints

1. Your regex `myRegex` should match 17 items.
2. Your regex `myRegex` should use the global flag.
3. Your regex `myRegex` should use the case insensitive flag.

## Solution

```html
```js
let quoteSample = "Blueberry 3.141592653s are delicious.";
let myRegex = /[h-s2-6]/gi; // Change this line
let result = quoteSample.match(myRegex); // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db5367417b2b2512b97*
