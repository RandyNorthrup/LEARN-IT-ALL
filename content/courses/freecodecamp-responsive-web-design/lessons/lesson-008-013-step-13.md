---
id: lesson-008-013
title: Step 13
chapterId: chapter-08
order: 13
duration: 5
objectives:
  - Step 13
---

# Step 13

Your marker would look better if it was centered on the page. An easy way to do that is with the `margin` <dfn>shorthand property</dfn>.

In the last project, you set the margin area of elements separately with properties like `margin-top` and `margin-left`. The `margin` shorthand property makes it easy to set multiple margin areas at the same time.

To center your marker on the page, set its `margin` property to `auto`. This sets `margin-top`, `margin-right`, `margin-bottom`, and `margin-left` all to `auto`.

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
    </div>
  </body>
</html>
```

## Hints

1. Your `.marker` CSS rule should have a `margin` property set to `auto`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 616d525007b8c5d8b3308b1c*
