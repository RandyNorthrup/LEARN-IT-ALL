---
id: lesson-015-016
title: Step 4
chapterId: chapter-15
order: 16
duration: 5
objectives:
  - Step 4
---

# Step 4

Before you start writing your project code, you should move it to its own file to keep things organized. 

Remove your `console.log("Hello World");` line. Then give your now empty `script` element a `src` attribute set to `./script.js`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
--fcc-editable-region--
    <script>
      console.log("Hello World");
    </script>
--fcc-editable-region--
  </head>
  <body>
    <div id="game">
    </div>
  </body>
</html>
```

## Hints

1. You should not have a `console.log("Hello World");` line in your code.
2. Your `script` element should have a `src` attribute set to `./script.js`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a257659d0d1e2456f24ba2*
