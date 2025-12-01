---
id: lesson-017-028
title: Step 29
chapterId: chapter-17
order: 28
duration: 5
objectives:
  - Step 29
---

# Step 29

Since your `update` event is running as a `change` event listener, the `event` parameter will be a change event.

The `target` property of the change event represents the element that changed. Assign the `target` property to a new variable called `element`.

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

1. You should declare an `element` variable in your `update` function.
2. You should use `const` to declare your `element` variable.
3. You should assign the `target` property of the `event` parameter to your `element` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449755666005520330cec5b*
