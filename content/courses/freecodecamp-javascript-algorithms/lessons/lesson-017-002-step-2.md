---
id: lesson-017-002
title: Step 2
chapterId: chapter-17
order: 2
duration: 5
objectives:
  - Step 2
---

# Step 2

Functions are ideal for reusable logic. When a function itself needs to reuse logic, you can declare a nested function to handle that logic. Here is an example of a nested function:

```js
const outer = () => {
  const inner = () => {

  };
};
```

Declare a nested `createLabel` function using arrow syntax. It should take a `name` parameter.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Functional Programming Spreadsheet</title>
  </head>
  <body>
    <div id="container">
      <div></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should declare a `createLabel` variable in your `onload` function.
2. Your `createLabel` variable should be declared after your `container` variable.
3. Your `createLabel` variable should be declared with `const`.
4. Your `createLabel` variable should be an arrow function.
5. Your `createLabel` function should have a `name` parameter.
6. Your `createLabel` function should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642dccb78549c9285835ebc2*
