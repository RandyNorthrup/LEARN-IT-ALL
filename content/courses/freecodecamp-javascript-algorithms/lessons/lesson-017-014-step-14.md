---
id: lesson-017-014
title: Step 14
chapterId: chapter-17
order: 14
duration: 5
objectives:
  - Step 14
---

# Step 14

Now call the `.forEach()` method of your `letters` array, and pass your `createLabel` function reference as the callback.

You should see some letters appear across the top of your spreadsheet.

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

1. You should call the `.forEach()` method on your `letters` array.
2. You should pass your `createLabel` function reference to the `.forEach()` method.
3. You should not pass a `createLabel` function call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64347464f78cd9209545f35c*
