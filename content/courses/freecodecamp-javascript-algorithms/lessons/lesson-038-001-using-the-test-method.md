---
id: lesson-038-001
title: Using the Test Method
chapterId: chapter-38
order: 1
duration: 5
objectives:
  - Using the Test Method
---

# Using the Test Method

Regular expressions are used in programming languages to match parts of strings. You create patterns to help you do that matching.

If you want to find the word `the` in the string `The dog chased the cat`, you could use the following regular expression: `/the/`. Notice that quote marks are not required within the regular expression.

JavaScript has multiple ways to use regexes. One way to test a regex is using the `.test()` method. The `.test()` method takes the regex, applies it to a string (which is placed inside the parentheses), and returns `true` or `false` if your pattern finds something or not.

```js
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
```

The `test` method here returns `true`.

## Instructions

Apply the regex `myRegex` on the string `myString` using the `.test()` method.

## Starter Code

```html
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex; // Change this line
```

## Hints

1. You should use `.test()` to test the regex.
2. Your result should return `true`.

## Solution

```html
```js
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString); // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db3367417b2b2512b8e*
