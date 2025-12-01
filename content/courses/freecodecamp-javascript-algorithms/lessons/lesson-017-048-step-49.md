---
id: lesson-017-048
title: Step 49
chapterId: chapter-17
order: 48
duration: 5
objectives:
  - Step 49
---

# Step 49

Use the same syntax as your `addCharacters` function to update your `elemValue` function. It should no longer declare `inner`, but should return the function implicitly.

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

1. Your `elemValue` function should use an implicit return.
2. Your `elemValue` function should implicitly return an arrow function with a `character` parameter.
3. Your inner arrow function should use an implicit return.
4. Your inner arrow function should return the result of calling `idToText()` with `character + num` as the argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d1980018efaaec2b1c28b*
