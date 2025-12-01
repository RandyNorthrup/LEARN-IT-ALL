---
id: lesson-008-084
title: Step 84
chapterId: chapter-08
order: 84
duration: 5
objectives:
  - Step 84
---

# Step 84

The black color of your border looks pretty harsh against the more transparent sleeve. You can use an alpha channel to lower the opacity of the black border.

For the `border-left` shorthand property, use the `rgba` function to set the color value to pure black with 75% opacity.

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
      </div>
      <div class="marker blue">
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.sleeve` CSS rule should have a `border-left` shorthand property and with the value `10px double rgba(0, 0, 0, 0.75)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b09f739aa6572d2064f9b8*
