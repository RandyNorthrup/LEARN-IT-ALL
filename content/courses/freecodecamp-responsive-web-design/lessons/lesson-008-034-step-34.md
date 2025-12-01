---
id: lesson-008-034
title: Step 34
chapterId: chapter-08
order: 34
duration: 5
objectives:
  - Step 34
---

# Step 34

There are three more tertiary colors: chartreuse green (green + yellow), azure (blue + cyan), and rose (red + magenta).

To create chartreuse green, update the `rgb` function in the `.one` CSS rule so that red is at `127`, and set green to the max value.

For azure, update the `rgb` function in the `.two` CSS rule so that green is at `127` and blue is at the max value.

And for rose, which is sometimes called bright pink, update the `rgb` function in the `.three` CSS rule so that blue is at `127` and red is at the max value.

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
      <div class="marker one">
      </div>
      <div class="marker two">
      </div>
      <div class="marker three">
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.one` CSS rule should have a `background-color` property set to `rgb(127, 255, 0)`.
2. Your `.two` CSS rule should have a `background-color` property set to `rgb(0, 127, 255)`.
3. Your `.three` CSS rule should have a `background-color` property set to `rgb(255, 0, 127)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617bd6ec666b1da2587e4e37*
