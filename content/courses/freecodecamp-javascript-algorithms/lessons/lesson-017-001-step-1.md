---
id: lesson-017-001
title: Step 1
chapterId: chapter-17
order: 1
duration: 5
objectives:
  - Step 1
---

# Step 1

Your project starts with a basic HTML container and some corresponding CSS. Your first task will be to programmatically generate the cells for your spreadsheet.

The global `window` object represents the browser window (or tab). It has an `onload` property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts.

Start by setting the `onload` property of `window` to an arrow function with no parameters. In the function, declare a `container` variable and assign it the value of getting the element by the `id` of `"container"`.

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

1. You should access the `onload` property of the `window` object.
2. You should set the `onload` property to a function.
3. You should use arrow syntax.
4. Your `onload` function should not take any parameters.
5. You should declare a `container` variable in your `onload` function.
6. Your `container` variable should be declared with `const`.
7. You should use `document.getElementById()`
8. You should get the element with the `id` of `"container"`.
9. You should assign the `#container` element to `container`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642db8c409d9991d0b3b2f0d*
