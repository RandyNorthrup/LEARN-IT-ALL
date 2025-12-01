---
id: lesson-017-007
title: Step 7
chapterId: chapter-17
order: 7
duration: 5
objectives:
  - Step 7
---

# Step 7

Your array will need to be the size of the range. You can calculate this by finding the difference between `end` and `start`, and adding `1` to the result.

Pass this calculation as the argument for your `Array()` constructor.

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

1. You should subtract `start` from `end`.
2. You should add `1` to your `end - start` calculation.
3. You should pass your calculation to the `Array()` constructor.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642dfb07e7fa6736251541c8*
