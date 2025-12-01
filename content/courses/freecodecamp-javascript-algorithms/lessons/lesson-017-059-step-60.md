---
id: lesson-017-059
title: Step 60
chapterId: chapter-17
order: 59
duration: 5
objectives:
  - Step 60
---

# Step 60

Now that your `.map()` function is receiving the returned `num => charRange(...).map(...)` function reference from the curried `addCharacters` calls, it will properly iterate over the elements and pass each element as `n` to that function.

You'll notice that you are not using your `match` parameter. In JavaScript, it is common convention to prefix an unused parameter with an underscore `_`. You could also leave the parameter empty like so: `(, char1)` but it is often clearer to name the parameter for future readability.

Prefix your `match` parameter with an underscore.

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

1. You should prefix your `match` parameter with an underscore.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3952f6af37b6a1c241c2*
