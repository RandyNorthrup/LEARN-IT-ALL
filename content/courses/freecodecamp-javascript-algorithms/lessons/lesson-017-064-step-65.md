---
id: lesson-017-064
title: Step 65
chapterId: chapter-17
order: 64
duration: 5
objectives:
  - Step 65
---

# Step 65

Object values do not have to be primitive types, like a string or a number. They can also be functions.

Give your `infixToFunction` object a `+` property. That property should be a function that takes an `x` and `y` parameter and implicitly returns the sum of those two parameters.

Because `+` is not alphanumeric, you'll need to wrap it in quotes for your property.

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

1. Your `infixToFunction` object should have a `+` property.
2. Your `+` property should be a function.
3. Your `+` function should use arrow syntax.
4. Your `+` function should have `x` as its first parameter.
5. Your `+` function should have `y` as its second parameter.
6. Your `+` function should use an implicit return.
7. Your `+` function should return the sum of `x` and `y`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3d037872fbbae0a8ec0e*
