---
id: lesson-017-080
title: Step 83
chapterId: chapter-17
order: 80
duration: 5
objectives:
  - Step 83
---

# Step 83

Declare a `functionCall` variable, and assign it this regular expression: `/([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i`

This expression will look for function calls like `sum(1, 4)`.

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

1. You should declare a `functionCall` variable.
2. You should use `const` to declare your `functionCall` variable.
3. You should assign `functionCall` the provided regular expression.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d448479c8fdc8dcec868c*
