---
id: lesson-008-088
title: Step 88
chapterId: chapter-08
order: 88
duration: 5
objectives:
  - Step 88
---

# Step 88

Notice that the edges of the shadow are sharp. This is because there is an optional `blurRadius` value for the `box-shadow` property:

```css
box-shadow: offsetX offsetY blurRadius color;
```

If a `blurRadius` value isn't included, it defaults to `0` and produces sharp edges. The higher the value of `blurRadius`, the greater the blurring effect is.

In the `.green` CSS rule, add the `box-shadow` property with the values `5px` for `offsetX`, `5px` for `offsetY`, `5px` for `blurRadius`, and `green` for `color`.

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

1. Your `.green` CSS rule should have a `box-shadow` shorthand property and with the value `5px 5px 5px green`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b30995968123ceb6b76167*
