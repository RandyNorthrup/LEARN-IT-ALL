---
id: lesson-008-090
title: Step 90
chapterId: chapter-08
order: 90
duration: 5
objectives:
  - Step 90
---

# Step 90

Now that you're familiar with the `box-shadow` property you can finalize the shadows, starting with the one for the red marker.

In the `.red` CSS rule, update the values for the `box-shadow` property so `offsetX` is `0`,`offsetY` is `0`, `blurRadius` is `20px`, `spreadRadius` is `0`, and `color` is `red`. Remember that you don't need to add units to a zero value.

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
        <div class="cap"></div>
        <div class="sleeve"></div>
      </div>
      <div class="marker green">
        <div class="cap"></div>
        <div class="sleeve"></div>
      </div>
      <div class="marker blue">
        <div class="cap"></div>
        <div class="sleeve"></div>
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.red` CSS rule should have a `box-shadow` shorthand property and with the value `0 0 20px 0 red`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b31287fb580ae75a486047*
