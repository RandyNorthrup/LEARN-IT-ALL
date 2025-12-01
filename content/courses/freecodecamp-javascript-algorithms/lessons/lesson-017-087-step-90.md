---
id: lesson-017-087
title: Step 90
chapterId: chapter-17
order: 87
duration: 5
objectives:
  - Step 90
---

# Step 90

Use the ternary operator to turn your `.hasOwnProperty()` call into the condition. If the object has the property, return the result of calling `apply` with `fn` and `args` as arguments. Otherwise, return `match`.

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

1. Your callback function should use ternary syntax.
2. If the ternary condition is true, your callback function should return the result of calling `apply()`.
3. You should pass `fn` as the first argument to your `apply()` call.
4. You should pass `args` as the second argument to your `apply()` call.
5. If the ternary is false, you should return `match`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d467c6994f4ce0dc416a4*
