---
id: lesson-008-062
title: Step 65
chapterId: chapter-08
order: 62
duration: 5
objectives:
  - Step 65
---

# Step 65

If no `gradientDirection` argument is provided to the `linear-gradient` function, it arranges colors from top to bottom, or along a 180 degree line, by default.

Clean up your code a little more by removing the `gradientDirection` argument from both `linear-gradient` functions.

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

1. You should remove the `gradientDirection` arguments from the `linear-gradient` functions in your `.red` and `.green` CSS rules.
2. Your `.red` CSS rule should have a `background` property set to `linear-gradient(rgb(122, 74, 14), rgb(245, 62, 113), rgb(162, 27, 27))`.
3. Your `.green` CSS rule should have a `background` property set to `linear-gradient(#55680D, #71F53E, #116C31)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61a5c906ab73313316e342f0*
