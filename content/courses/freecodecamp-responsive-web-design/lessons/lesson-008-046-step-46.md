---
id: lesson-008-046
title: Step 46
chapterId: chapter-08
order: 46
duration: 5
objectives:
  - Step 46
---

# Step 46

A very common way to apply color to an element with CSS is with <dfn>hexadecimal</dfn> or hex values. While hex values sound complicated, they're really just another form of RGB values.

Hex color values start with a `#` character and take six characters from 0-9 and A-F. The first pair of characters represent red, the second pair represent green, and the third pair represent blue. For example, `#4B5320`.

In the `.green` class selector, set the `background-color` property to a hex color code with the values `00` for red, `FF` for green, and `00` blue.

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

1. Your `.green` CSS rule should have a `background-color` property set to `#00FF00`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619b761916dac02643940022*
