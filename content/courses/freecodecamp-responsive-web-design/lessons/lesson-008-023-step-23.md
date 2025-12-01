---
id: lesson-008-023
title: Step 23
chapterId: chapter-08
order: 23
duration: 5
objectives:
  - Step 23
---

# Step 23

Notice that the `background-color` for your marker is still red. This is because you set the red value of the `rgb` function to the max of `255`, or 100% red, and set both the green and blue values to `0`.

Now use the `rgb` function to set the other colors.

In the `.two` CSS rule, use the `rgb` function to set the `background-color` to the max value for green, and `0` for the other values. And in the `.three` CSS rule, use the `rgb` function to set the `background-color` to the max value for blue, and `0` for the other values.

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

1. Your `.two` CSS rule should not use the `green` color keyword to set the `background-color` property.
2. Your `.two` CSS rule should have a `background-color` property set to `rgb(0, 255, 0)`.
3. Your `.three` CSS rule should not use the `blue` color keyword to set the `background-color` property.
4. Your `.three` CSS rule should have a `background-color` property set to `rgb(0, 0, 255)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617b8e0d93a8d10d9a90e720*
