---
id: lesson-008-051
title: Step 53
chapterId: chapter-08
order: 51
duration: 5
objectives:
  - Step 53
---

# Step 53

As you can see, the `linear-gradient` function produced a smooth red-green gradient. While the `linear-gradient` function needs a minimum of two color arguments to work, it can accept many color arguments.

Use the `rgb` function to add pure blue as the third color argument to the `linear-gradient` function.

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

1. Your `.red` CSS rule should have a `background` property set to `linear-gradient(90deg, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a498399534644f59cff05e*
