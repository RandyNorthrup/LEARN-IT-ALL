---
id: lesson-008-064
title: Step 67
chapterId: chapter-08
order: 64
duration: 5
objectives:
  - Step 67
---

# Step 67

Use the `linear-gradient` function, and pass in the `hsl` function with the values `186` for hue, `76%` for saturation, and `16%` for lightness as the first color argument.

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

1. Your `.blue` CSS rule should have a `background` property with the value `linear-gradient(hsl(186, 76%, 16%))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a5d594b887335228ee6533*
