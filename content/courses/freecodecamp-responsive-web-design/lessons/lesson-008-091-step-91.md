---
id: lesson-008-091
title: Step 91
chapterId: chapter-08
order: 91
duration: 5
objectives:
  - Step 91
---

# Step 91

Next, update the `color` value of the red marker's `box-shadow` property.

Replace the named color with the `rgba` function. Use the values `83` for red, `14` for green, `14` for blue and `0.8` for the alpha channel.

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

1. Your `.red` CSS rule should have a `box-shadow` shorthand property and with the value `0 0 20px 0 rgba(83, 14, 14, 0.8)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b315e76a63b3ecbbb11b75*
