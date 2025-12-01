---
id: lesson-017-071
title: Step 72
chapterId: chapter-17
order: 71
duration: 5
objectives:
  - Step 72
---

# Step 72

You have a slight bug. `arg1` and `arg2` are strings, not numbers. `infixToFunction['+']("1", "2")` would return `12`, which is not mathematically correct.

Wrap each of your `infixToFunction[operator]` arguments in a `parseFloat()` call.

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

1. You should wrap `arg1` in a `parseFloat()` call.
2. You should wrap `arg2` in a `parseFloat()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3f1fd12f76c02c823bb8*
