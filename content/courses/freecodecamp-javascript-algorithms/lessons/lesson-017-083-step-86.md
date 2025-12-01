---
id: lesson-017-083
title: Step 86
chapterId: chapter-17
order: 83
duration: 5
objectives:
  - Step 86
---

# Step 86

The `fn` parameter will be passed the name of a function, such as `"SUM"`. Update `apply` to implicitly return the function from your `spreadsheetFunctions` object using the `fn` variable as the key for the object access.

Remember that `fn` might not contain a lowercase string, so you'll need to convert it to a lowercase string.

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

1. Your `apply` function should use an implicit return.
2. Your `apply` function should access the `spreadsheetFunctions` object.
3. Your `apply` function should access the property of the `spreadsheetFunctions` object that matches the `fn` value.
4. Your `apply` function should call the `.toLowerCase()` method on `fn` in the property access.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4554721d43cb19a68bc4*
