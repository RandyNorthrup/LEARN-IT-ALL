---
id: lesson-038-032
title: Check For Mixed Grouping of Characters
chapterId: chapter-38
order: 32
duration: 5
objectives:
  - Check For Mixed Grouping of Characters
---

# Check For Mixed Grouping of Characters

Sometimes we want to check for groups of characters using a Regular Expression and to achieve that we use parentheses `()`.

If you want to find either `Penguin` or `Pumpkin` in a string, you can use the following Regular Expression: `/P(engu|umpk)in/g`

Then check whether the desired string groups are in the test string by using the `test()` method.

```js
let testStr = "Pumpkin";
let testRegex = /P(engu|umpk)in/;
testRegex.test(testStr);
```

The `test` method here would return `true`.

## Instructions

Fix the regex so that it checks for the names of `Franklin Roosevelt` or `Eleanor Roosevelt` in a case sensitive manner and it should make concessions for middle names.

Then fix the code so that the regex that you have created is checked against `myString` and either `true` or `false` is returned depending on whether the regex matches.

## Starter Code

```html
let myString = "Eleanor Roosevelt";
let myRegex = /False/; // Change this line
let result = false; // Change this line
// After passing the challenge experiment with myString and see how the grouping works
```

## Hints

1. Your regex `myRegex` should return `true` for the string `Franklin D. Roosevelt`
2. Your regex `myRegex` should return `true` for the string `Eleanor Roosevelt`
3. Your regex `myRegex` should return `false` for the string `Franklin Rosevelt`
4. Your regex `myRegex` should return `false` for the string `Frank Roosevelt`
5. Your regex `myRegex` should return `false` for the string `FranklinRoosevelt`
6. Your regex `myRegex` should return `false` for the string `EleanorRoosevelt`
7. You should use `.test()` to test the regex.
8. Your result should return `true`.

## Solution

```html
```js
let myString = "Eleanor Roosevelt";
let myRegex = /(Franklin|Eleanor) (([A-Z]\.?|[A-Z][a-z]+) )?Roosevelt/;
let result = myRegex.test(myString);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5c3dda8b4d8df89bea71600f*
