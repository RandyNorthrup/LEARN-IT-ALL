---
id: lesson-017-062
title: Step 63
chapterId: chapter-17
order: 62
duration: 5
objectives:
  - Step 63
---

# Step 63

Update your callback function to return the result of calling `idToText()` with `match` as the argument. Remember that your regular expression is case-insensitive, so you will need to call `toUpperCase()` on `match` before passing it to `idToText()`.

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

1. Your callback function should use an implicit return.
2. Your callback function should call `idToText()`.
3. You should pass `match` to your `idToText()` call.
4. You should call the `.toUpperCase()` method of `match` as you pass it to `idToText()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3bc75fe0c9b972da3323*
