---
id: lesson-008-089
title: Step 89
chapterId: chapter-08
order: 89
duration: 5
objectives:
  - Step 89
---

# Step 89

But what if you wanted to expand the shadow out further? You can do that with the optional `spreadRadius` value:

```css
box-shadow: offsetX offsetY blurRadius spreadRadius color;
```

Like `blurRadius`, `spreadRadius` defaults to `0` if it isn't included.

Practice by adding a 5 pixel shadow directly around the blue marker.

In the `.blue` CSS rule, add the `box-shadow` property with the values `0` for `offsetX`, `0` for `offsetY`, `0` for `blurRadius`, `5px` for `spreadRadius`, and `blue` for `color`.

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

1. Your `.blue` CSS rule should have a `box-shadow` shorthand property and with the value `0 0 0 5px blue`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b30a286c228bd0c493c09a*
