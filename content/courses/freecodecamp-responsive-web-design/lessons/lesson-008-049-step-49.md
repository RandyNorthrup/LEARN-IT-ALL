---
id: lesson-008-049
title: Step 49
chapterId: chapter-08
order: 49
duration: 5
objectives:
  - Step 49
---

# Step 49

You've learned a few ways to set flat colors in CSS, but you can also use a color transition, or <dfn>gradient</dfn>, on an element.

A gradient is when one color transitions into another. The CSS `linear-gradient` function lets you control the direction of the transition along a line, and which colors are used.

One thing to remember is that the `linear-gradient` function actually creates an `image` element, and is usually paired with the `background` property which can accept an image as a value.

In the `.red` CSS rule, change the `background-color` property to `background`.

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

1. Your `.red` CSS rule should have a `background` property with the value `rgb(255, 0, 0)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a489b8579e87364b2d2cdb*
