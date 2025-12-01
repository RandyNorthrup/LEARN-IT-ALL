---
id: lesson-017-092
title: Step 95
chapterId: chapter-17
order: 92
duration: 5
objectives:
  - Step 95
---

# Step 95

You can quickly get all cells from your page by getting the `#container` element by its `id` and accessing the `children` property of the result. Pass that to your `evalFormula()` call as the second parameter.

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

1. For the second parameter of your `evalFormula()` call, you should call the `.getElementById()` method of the `document` object.
2. You should pass `container` as the argument to your `.getElementById()` call.
3. You should access the `children` property of the result of your `.getElementById()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4813c17b37d1e261a566*
