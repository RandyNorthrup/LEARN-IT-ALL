---
id: lesson-008-092
title: Step 92
chapterId: chapter-08
order: 92
duration: 5
objectives:
  - Step 92
---

# Step 92

The shadows for your green and blue markers will have the same position, blur, and spread. The only difference will be the colors.

In the `.green` and `.blue` CSS rules, update the values for the `box-shadow` properties so `offsetX` is `0`,`offsetY` is `0`, `blurRadius` is `20px`, and `spreadRadius` is `0`. Leave the colors as `green` and `blue` for now.

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

1. Your `.green` CSS rule should have a `box-shadow` shorthand property and with the value `0 0 20px 0 green`.
2. Your `.blue` CSS rule should have a `box-shadow` shorthand property and with the value `0 0 20px 0 blue`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b3183655ec10efd8c0bb07*
