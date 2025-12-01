---
id: lesson-008-082
title: Step 52
chapterId: chapter-08
order: 82
duration: 5
objectives:
  - Step 52
---

# Step 52

You won't see gradient yet because the `linear-gradient` function needs at least two color arguments to work.

In the same `linear-gradient` function, use the `rgb` function to set the second color argument to pure green.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colored Markers</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>CSS Color Markers</h1>
    <div class="container">
      <div class="marker red">
      </div>
      <div class="marker green">
      </div>
      <div class="marker blue">
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.red` CSS rule should have a `background` property set to `linear-gradient(90deg, rgb(255, 0, 0), rgb(0, 255, 0))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b095a79e7fc020b43b1bba*
