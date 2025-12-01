---
id: lesson-006-021
title: Create an Export Fallback with export default
chapterId: chapter-06
order: 21
duration: 5
objectives:
  - Create an Export Fallback with export default
---

# Create an Export Fallback with export default

In the `export` lesson, you learned about the syntax referred to as a <dfn>named export</dfn>. This allowed you to make multiple functions and variables available for use in other files.

There is another `export` syntax you need to know, known as <dfn>export default</dfn>. Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.

Below are examples using `export default`:

```js
export default function add(x, y) {
  return x + y;
}

export default function(x, y) {
  return x + y;
}
```

The first is a named function, and the second is an anonymous function.

Since `export default` is used to declare a fallback value for a module or file, you can only have one value be a default export in each module or file. Additionally, you cannot use `export default` with `var`, `let`, or `const`

## Instructions

The following function should be the fallback value for the module. Please add the necessary code to do so.

## Starter Code

```html
function subtract(x, y) {
  return x - y;
}
```

## Hints

1. Your code should use an `export` fallback.

## Solution

```html
```js
export default function subtract(x, y) {
  return x - y;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8c367417b2b2512b58*
