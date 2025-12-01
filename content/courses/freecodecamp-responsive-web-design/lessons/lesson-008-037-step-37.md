---
id: lesson-008-037
title: Step 37
chapterId: chapter-08
order: 37
duration: 5
objectives:
  - Step 37
---

# Step 37

Notice that the red and cyan colors are very bright right next to each other. This contrast can be distracting if it's overused on a website, and can make text hard to read if it's placed on a complementary-colored background.

It's better practice to choose one color as the dominant color, and use its complementary color as an accent to bring attention to certain content on the page.

First, in the `h1` rule, use the `rgb` function to set its `background-color` to cyan.

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

1. You should not remove or modify the `text-align` property or its value.
2. Your `h1` CSS rule should have a `background-color` property set to `rgb(0, 255, 255)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 618a0b2befb143baefab632b*
