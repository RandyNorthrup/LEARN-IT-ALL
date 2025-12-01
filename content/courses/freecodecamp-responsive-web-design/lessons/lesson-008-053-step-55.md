---
id: lesson-008-053
title: Step 55
chapterId: chapter-08
order: 53
duration: 5
objectives:
  - Step 55
---

# Step 55

Now that you know the basics of how the `linear-gradient` function and color-stops work, you can use them to make the markers look more realistic.

In the `linear-gradient` function, set `gradientDirection` to `180deg`.

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

1. Your `.red` CSS rule should have a `background` property set to `linear-gradient(180deg, rgb(255, 0, 0) 75%, rgb(0, 255, 0), rgb(0, 0, 255))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a4a53c4459446dc134a1c6*
