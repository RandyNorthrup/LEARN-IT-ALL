---
id: lesson-008-050
title: Step 50
chapterId: chapter-08
order: 50
duration: 5
objectives:
  - Step 50
---

# Step 50

The `linear-gradient` function is very flexible -- here is the basic syntax you'll use in this tutorial:

```css
linear-gradient(gradientDirection, color1, color2, ...);
```

`gradientDirection` is the direction of the line used for the transition. `color1` and `color2` are color arguments, which are the colors that will be used in the transition itself. These can be any type of color, including color keywords, hex, `rgb`, or `hsl`.

Now you'll apply a red-to-green gradient along a 90 degree line to the first marker.

First, in the `.red` CSS rule, set the `background` property to `linear-gradient()`, and pass it the value `90deg` as the `gradientDirection`.

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

1. Your `.red` CSS rule should have a `background` property with the value `linear-gradient(90deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a493ead935c148d2b76312*
