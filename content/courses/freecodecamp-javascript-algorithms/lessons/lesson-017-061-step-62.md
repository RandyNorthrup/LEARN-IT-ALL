---
id: lesson-017-061
title: Step 62
chapterId: chapter-17
order: 61
duration: 5
objectives:
  - Step 62
---

# Step 62

Declare a `cellExpanded` variable and assign it the value of calling `.replace()` on your `rangeExpanded` variable. Pass it your `cellRegex` and an empty callback function. The callback function should take a `match` parameter.

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

1. You should declare a `cellExpanded` variable.
2. You should use `const` to declare your `cellExpanded` variable.
3. You should assign `cellExpanded` the result of calling the `.replace()` method of `rangeExpanded`.
4. You should pass `cellRegex` as the first argument to your `.replace()` call.
5. You should pass a callback function using arrow syntax as the second argument to your `.replace()` call.
6. Your callback function should have a `match` parameter.
7. Your callback function should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3b27cd3c56b875256301*
