---
id: lesson-008-080
title: Step 78
chapterId: chapter-08
order: 80
duration: 5
objectives:
  - Step 78
---

# Step 78

It looks like your sleeve disappeared, but don't worry -- it's still there. What happened is that your new cap `div` is taking up the entire width of the marker, and is pushing the sleeve down to the next line.

This is because the default `display` property for `div` elements is `block`. So when two `block` elements are next to each other, they stack like actual blocks. For example, your marker elements are all stacked on top of each other.

To position two `div` elements on the same line, set their `display` properties to `inline-block`.

Create a new rule to target both the `cap` and `sleeve` classes, and set `display` to `inline-block`.

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

1. You should use a class selector to target both the `cap` and `sleeve` classes.
2. Your CSS rule should have a `display` property set to `inline-block`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b0936d9e7fc020b43b1bb8*
