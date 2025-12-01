---
id: lesson-017-085
title: Step 88
chapterId: chapter-17
order: 85
duration: 5
objectives:
  - Step 88
---

# Step 88

Now your `applyFunction` needs to return a result. Return the result of calling the `.replace()` method on `str2`. Pass your `functionCall` regex and an empty callback.

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

1. Your `applyFunction` function should return the result of calling the `.replace()` method on `str2`.
2. You should pass `functionCall` as the first argument to your `.replace()` call.
3. You should pass an empty arrow function as the second argument to your `.replace()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d45ee725632cca2555146*
