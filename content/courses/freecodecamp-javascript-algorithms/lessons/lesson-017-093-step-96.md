---
id: lesson-017-093
title: Step 96
chapterId: chapter-17
order: 93
duration: 5
objectives:
  - Step 96
---

# Step 96

Unfortunately, that `children` property is returning a collection of elements, which is array-like but not an array. Wrap your second argument in `Array.from()` to convert it to an array.

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

1. You should wrap your `document.getElementById('container').children` in `Array.from()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d486aec20f7d2a581cc36*
