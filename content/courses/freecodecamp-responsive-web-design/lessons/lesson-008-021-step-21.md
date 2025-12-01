---
id: lesson-008-021
title: Step 21
chapterId: chapter-08
order: 21
duration: 5
objectives:
  - Step 21
---

# Step 21

There are two main color models: the <dfn>additive</dfn> RGB (red, green, blue) model used in electronic devices, and the <dfn>subtractive</dfn> CMYK (cyan, magenta, yellow, black) model used in print.

In this project, you'll work with the RGB model. This means that colors begin as black, and change as different levels of red, green, and blue are introduced. An easy way to see this is with the CSS `rgb` function.

Create a new CSS rule that targets the class `container` and set its `background-color` to black with `rgb(0, 0, 0)`.

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

1. You should use a class selector to target the class `container`.
2. Your `.container` CSS rule should have a `background-color` property set to `rgb(0, 0, 0)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617b65579ce424bf5f02ca73*
