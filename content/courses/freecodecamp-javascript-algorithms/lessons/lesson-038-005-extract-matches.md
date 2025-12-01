---
id: lesson-038-005
title: Extract Matches
chapterId: chapter-38
order: 5
duration: 5
objectives:
  - Extract Matches
---

# Extract Matches

So far, you have only been checking if a pattern exists or not within a string. You can also extract the actual matches you found with the `.match()` method.

To use the `.match()` method, apply the method on a string and pass in the regex inside the parentheses.

Here's an example:

```js
"Hello, World!".match(/Hello/);
let ourStr = "Regular expressions";
let ourRegex = /expressions/;
ourStr.match(ourRegex);
```

Here the first `match` would return `["Hello"]` and the second would return `["expressions"]`.

Note that the `.match` syntax is the "opposite" of the `.test` method you have been using thus far:

```js
'string'.match(/regex/);
/regex/.test('string');
```

## Instructions

Apply the `.match()` method to extract the string `coding`.

## Starter Code

```html
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /change/; // Change this line
let result = extractStr; // Change this line
```

## Hints

1. The `result` should have the string `coding`
2. Your regex `codingRegex` should search for the string `coding`
3. You should use the `.match()` method.

## Solution

```html
```js
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/; // Change this line
let result = extractStr.match(codingRegex); // Change this line
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db4367417b2b2512b92*
