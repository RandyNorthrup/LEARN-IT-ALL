---
id: lesson-008-060
title: Step 63
chapterId: chapter-08
order: 60
duration: 5
objectives:
  - Step 63
---

# Step 63

That's looking better, but the bottom edge of the green marker needs to be darker to add a little more dimension.

In the same `linear-gradient` function, add a hex color code with the values `11` for red, `6C` for green, and `31` for blue as the third color argument.

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

1. Your `.green` CSS rule should have a `background` property set to `linear-gradient(180deg, #55680D, #71F53E, #116C31)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a5be9833e7dc178de2af10*
