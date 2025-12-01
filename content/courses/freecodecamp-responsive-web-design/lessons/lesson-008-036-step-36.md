---
id: lesson-008-036
title: Step 36
chapterId: chapter-08
order: 36
duration: 5
objectives:
  - Step 36
---

# Step 36

A color wheel is a circle where similar colors, or <dfn>hues</dfn>, are near each other, and different ones are further apart. For example, pure red is between the hues rose and orange.

Two colors that are opposite from each other on the color wheel are called <dfn>complementary colors</dfn>. If two complementary colors are combined, they produce gray. But when they are placed side-by-side, these colors produce strong visual contrast and appear brighter.

In the `rgb` function for the `.one` CSS rule, set the red value to the max of `255` to produce pure red. In the `rgb` function for `.two` CSS rule, set the values for green and blue to the max of `255` to produce cyan.

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

1. Your `.one` CSS rule should have a `background-color` property set to `rgb(255, 0, 0)`.
2. Your `.two` CSS rule should have a `background-color` property set to `rgb(0, 255, 255)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 618a0927005553b74bfa05ae*
