---
id: lesson-017-003
title: Step 3
chapterId: chapter-17
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

Remember that the `document` object has a `.createElement()` method which allows you to dynamically create new HTML elements.

In your `createLabel` function, declare a `label` variable and assign it a new `div` element.

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

1. You should declare a `label` variable in your `createLabel` function.
2. Your `label` variable should be declared with `const`.
3. You should use the `.createElement()` method of the `document` object.
4. You should pass the string `"div"` to the `.createElement()` method.
5. You should assign your new `div` element to `label`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642ddfdea4200e313f80a4b6*
