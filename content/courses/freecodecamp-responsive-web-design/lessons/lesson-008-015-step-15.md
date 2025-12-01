---
id: lesson-008-015
title: Step 15
chapterId: chapter-08
order: 15
duration: 5
objectives:
  - Step 15
---

# Step 15

While you have three separate marker `div` elements, they look like one big rectangle. You should add some space between them to make it easier to see each element.

When the shorthand `margin` property has two values, it sets `margin-top` and `margin-bottom` to the first value, and `margin-left` and `margin-right` to the second value.

In your `.marker` CSS rule, set the `margin` property to `10px auto`.

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
      <div class="marker">
      </div>
      <div class="marker">
      </div>
      <div class="marker">
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.marker` CSS rule should have a `margin` property set to `10px auto`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 616d595270d902f0e7086e18*
