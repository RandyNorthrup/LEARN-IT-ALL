---
id: lesson-006-019
title: Use export to Share a Code Block
chapterId: chapter-06
order: 19
duration: 5
objectives:
  - Use export to Share a Code Block
---

# Use export to Share a Code Block

Imagine a file called `math_functions.js` that contains several functions related to mathematical operations. One of them is stored in a variable, `add`, that takes in two numbers and returns their sum. You want to use this function in several different JavaScript files. In order to share it with these other files, you first need to `export` it.

```js
export const add = (x, y) => {
  return x + y;
}
```

The above is a common way to export a single function, but you can achieve the same thing like this:

```js
const add = (x, y) => {
  return x + y;
}

export { add };
```

When you export a variable or function, you can import it in another file and use it without having to rewrite the code. You can export multiple things by repeating the first example for each thing you want to export, or by placing them all in the export statement of the second example, like this:

```js
export { add, subtract };
```

## Instructions

There are two string-related functions in the editor. Export both of them using the method of your choice.

## Starter Code

```html
const uppercaseString = (string) => {
  return string.toUpperCase();
}

const lowercaseString = (string) => {
  return string.toLowerCase()
}
```

## Hints

1. You should properly export `uppercaseString`.
2. You should properly export `lowercaseString`.

## Solution

```html
```js
export const uppercaseString = (string) => {
  return string.toUpperCase();
}

export const lowercaseString = (string) => {
  return string.toLowerCase()
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8c367417b2b2512b56*
