---
id: lesson-008-086
title: Step 86
chapterId: chapter-08
order: 86
duration: 5
objectives:
  - Step 86
---

# Step 86

The last thing you'll do is add a slight shadow to each marker to make them look even more realistic.

The `box-shadow` property lets you apply one or more shadows around an element. Here is basic syntax:

```css
box-shadow: offsetX offsetY color;
```

Here's how the `offsetX` and `offsetY` values work:

* both `offsetX` and `offsetY` accept number values in `px` and other CSS units
* a positive `offsetX` value moves the shadow right and a negative value moves it left
* a positive `offsetY` value moves the shadow down and a negative value moves it up
* if you want a value of zero (`0`) for any or both `offsetX` and `offsetY`, you don't need to add a unit. Every browser understands that zero means no change.

The height and width of the shadow is determined by the height and width of the element it's applied to. You can also use an optional `spreadRadius` value to spread out the reach of the shadow. More on that later.

Start by adding a simple shadow to the red marker.

In the `.red` CSS rule, add the `box-shadow` property with the values `5px` for `offsetX`, `5px` for `offsetY`, and `red` for `color`.

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

1. Your `.red` CSS rule should have a `box-shadow` shorthand property and with the value `5px 5px red`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b0a44a6b865738ba49b9fb*
