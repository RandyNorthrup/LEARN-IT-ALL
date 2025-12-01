---
id: lesson-008-025
title: Step 25
chapterId: chapter-08
order: 25
duration: 5
objectives:
  - Step 25
---

# Step 25

Now add a little more vertical space between your markers and the edge of the `container` element they're in.

In the `.container` CSS rule, use the shorthand `padding` property to add `10px` of top and bottom padding, and set the left and right padding to `0`. This works similarly to the shorthand `margin` property you used earlier.

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
      <div class="marker one">
      </div>
      <div class="marker two">
      </div>
      <div class="marker three">
      </div>
    </div>
  </body>
</html>
```

## Hints

1. You should not remove the `background-color` property and its value from the `.container` CSS rule.
2. Your `.container` CSS rule should have a `padding` property set to `10px 0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617b954d9f4f6217a749380e*
