---
id: lesson-008-076
title: Step 74
chapterId: chapter-08
order: 76
duration: 5
objectives:
  - Step 74
---

# Step 74

Another way to set the opacity for an element is with the <dfn>alpha channel</dfn>. Similar to the `opacity` property, the alpha channel controls how transparent or opaque a color is.

You've already set sleeve's opacity with a named color and the `opacity` property, but you can add an alpha channel to the other CSS color properties.

Inside the `.sleeve` rule, remove the `opacity` property and value.

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

1. Your `.sleeve` CSS rule should not have an `opacity` property and value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61b093219e7fc020b43b1bb4*
