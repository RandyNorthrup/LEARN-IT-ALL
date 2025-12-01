---
id: lesson-008-022
title: Step 22
chapterId: chapter-08
order: 22
duration: 5
objectives:
  - Step 22
---

# Step 22

A function is a piece of code that can take an input and perform a specific action. The CSS `rgb` function accepts values, or <dfn>arguments</dfn>, for red, green, and blue, and produces a color:

```css
rgb(red, green, blue);
```

Each red, green, and blue value is a number from `0` to `255`. `0` means that there's 0% of that color, and is black. `255` means that there's 100% of that color.

In the `.one` CSS rule, replace the color keyword `red` with the `rgb` function. For the `rgb` function, set the value for red to `255`, the value for green to `0`, and the value for blue to `0`.

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

1. Your `.one` CSS rule should not use the `red` color keyword to set the `background-color` property.
2. Your `.one` CSS rule should have a `background-color` property set to `rgb(255, 0, 0)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617b8b38f32bf2080a140675*
