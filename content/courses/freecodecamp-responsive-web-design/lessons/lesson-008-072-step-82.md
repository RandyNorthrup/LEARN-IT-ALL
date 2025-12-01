---
id: lesson-008-072
title: Step 82
chapterId: chapter-08
order: 72
duration: 5
objectives:
  - Step 82
---

# Step 82

The `border-left` shorthand property lets you to set the left border's width, style, and color at the same time.

Here is the syntax:

```css
border-left: width style color;
```

In the `.sleeve` CSS rule, replace the `border-left-width`, `border-left-style`, and `border-left-color` properties with the `border-left` shorthand property. The values for the width, style, and color of the left border should be the same.

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

1. Your `.sleeve` CSS rule should not have a `border-left-width` property and value.
2. Your `.sleeve` CSS rule should not have a `border-left-style` property and value.
3. Your `.sleeve` CSS rule should not have a `border-left-color` property and value.
4. Your `.sleeve` CSS rule should have a `border-left` shorthand property and with the value `10px solid black`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61addaf7e83988b59a7d18ff*
