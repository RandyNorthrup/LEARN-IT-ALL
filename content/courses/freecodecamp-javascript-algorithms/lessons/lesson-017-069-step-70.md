---
id: lesson-017-069
title: Step 70
chapterId: chapter-17
order: 69
duration: 5
objectives:
  - Step 70
---

# Step 70

The `regex` you will be passing to your `infixEval` function will match two numbers with an operator between them. The first number will be assigned to `arg1` in the callback, the second to `arg2`, and the operator to `operator`.

Have your callback function implicitly return the `operator` property of your `infixToFunction` object. Remember that `operator` is a variable which holds the property name, not the actual property name.

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

1. Your callback should use an implicit return.
2. Your callback function should access the `infixToFunction` object.
3. Your callback function should use bracket notation to access the property of the `infixToFunction` object that matches the value of the `operator` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3e64b15f92be6e61704e*
