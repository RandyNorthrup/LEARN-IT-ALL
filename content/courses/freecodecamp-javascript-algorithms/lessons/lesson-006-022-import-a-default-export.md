---
id: lesson-006-022
title: Import a Default Export
chapterId: chapter-06
order: 22
duration: 5
objectives:
  - Import a Default Export
---

# Import a Default Export

In the last challenge, you learned about `export default` and its uses. To import a default export, you need to use a different `import` syntax. In the following example, `add` is the default export of the `math_functions.js` file. Here is how to import it:

```js
import add from "./math_functions.js";
```

The syntax differs in one key place. The imported value, `add`, is not surrounded by curly braces (`{}`). `add` here is simply a variable name for whatever the default export of the `math_functions.js` file is. You can use any name here when importing a default.

## Instructions

In the following code, import the default export from the `math_functions.js` file, found in the same directory as this file. Give the import the name `subtract`.

## Starter Code

```html
// Only change code above this line

subtract(7,4);
```

## Hints

1. You should properly import `subtract` from `math_functions.js`.

## Solution

```html
```js
import subtract from "./math_functions.js";

subtract(7,4);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8d367417b2b2512b59*
