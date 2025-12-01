---
id: lesson-008-059
title: Step 61
chapterId: chapter-08
order: 59
duration: 5
objectives:
  - Step 61
---

# Step 61

For this marker, you'll use hex color codes for your gradient.

Use the `linear-gradient` function and set `gradientDirection` to `180deg`. And for the first color argument, use a hex color code with the values `55` for red, `68` for green, and `0D` for blue.

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

1. Your `.green` CSS rule should have a `background` property with the value `linear-gradient(180deg, #55680D)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a4ae5f29eb5584187201c3*
