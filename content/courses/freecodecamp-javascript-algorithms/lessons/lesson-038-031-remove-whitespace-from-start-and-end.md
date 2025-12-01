---
id: lesson-038-031
title: Remove Whitespace from Start and End
chapterId: chapter-38
order: 31
duration: 5
objectives:
  - Remove Whitespace from Start and End
---

# Remove Whitespace from Start and End

Sometimes whitespace characters around strings are not wanted but are there. Typical processing of strings is to remove the whitespace at the start and end of it.

## Instructions

Write a regex and use the appropriate string methods to remove whitespace at the beginning and end of strings.

**Note:** The `String.prototype.trim()` method would work here, but you'll need to complete this challenge using regular expressions.

## Starter Code

```html
let hello = "   Hello, World!  ";
let wsRegex = /change/; // Change this line
let result = hello; // Change this line
```

## Hints

1. `result` should be equal to the string `Hello, World!`
2. Your solution should not use the `String.prototype.trim()` method.
3. The `result` variable should not directly be set to a string
4. The value of the `hello` variable should not be changed.

## Solution

```html
```js
let hello = "   Hello, World!  ";
let wsRegex = /^(\s+)(.+[^\s])(\s+)$/;
let result = hello.replace(wsRegex, '$2');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dbb367417b2b2512bac*
