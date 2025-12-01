---
id: lesson-017-045
title: Step 46
chapterId: chapter-17
order: 45
duration: 5
objectives:
  - Step 46
---

# Step 46

In your `elemValue` function, you explicitly declared a function called `inner` and returned it. However, because you are using arrow syntax, you can implicitly return a function. For example:

```js
const curry = soup => veggies => {};
```

`curry` is a function which takes a `soup` parameter and returns a function which takes a `veggies` parameter. Using this syntax, update your `addCharacters` function to return an empty function which takes a `character2` parameter.

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

1. Your `addCharacters` function should use an implicit return.
2. Your `addCharacters` function should return an arrow function which has a `character2` parameter.
3. Your inner arrow function should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d0d20108440acc95a6b32*
