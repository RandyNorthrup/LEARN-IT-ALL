---
id: lesson-017-053
title: Step 54
chapterId: chapter-17
order: 53
duration: 5
objectives:
  - Step 54
---

# Step 54

The second argument to the `.replace()` method does not have to be a string. You can instead pass a callback function to run more complex logic on the matched string.

The callback function takes a few parameters. The first is the matched string. Pass an empty callback function to your `.replace()` call, and give it a `match` parameter.

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

1. You should pass an arrow function as the second argument to your `.replace()` method.
2. Your arrow function should take a `match` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d1e531042dfb24da1f032*
