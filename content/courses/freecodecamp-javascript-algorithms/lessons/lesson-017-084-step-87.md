---
id: lesson-017-084
title: Step 87
chapterId: chapter-17
order: 84
duration: 5
objectives:
  - Step 87
---

# Step 87

Your `apply` function is returning the spreadsheet function, but not actually applying it. Update `apply` to call the function. Pass in the result of calling `toNumberList` with `args` as an argument.

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

1. Your `apply` function should call the `spreadsheetFunctions[fn.toLowerCase()]` function.
2. You should pass a `toNumberList()` call to your `spreadsheetFunctions[fn.toLowerCase()]` call.
3. You should pass `args` to your `toNumberList()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d45b739da5ecbf830c108*
