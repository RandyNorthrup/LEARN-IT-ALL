---
id: lesson-017-016
title: Step 16
chapterId: chapter-17
order: 16
duration: 5
objectives:
  - Step 16
---

# Step 16

In your callback, you will need to make two function calls. Start by calling `createLabel()` and pass `number` as the argument. You should see some numbers appear in your spreadsheet.

Then call the `.forEach()` method on your `letters` array. Pass an empty callback function which takes a `letter` parameter.

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

1. You should call your `createLabel()` function.
2. You should pass `number` to your `createLabel()` call.
3. You should call the `.forEach()` method on your `letters` array.
4. You should pass a callback function with arrow syntax to your `.forEach()` method.
5. Your callback function should have a `letter` parameter.
6. Your callback function should be empty.
7. Your `letters.forEach()` callback function should be nested inside the `range(1, 99).forEach(number => {}` callback function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6434759f78ec812264ff8f34*
