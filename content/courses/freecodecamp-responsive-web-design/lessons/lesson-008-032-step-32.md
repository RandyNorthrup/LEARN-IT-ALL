---
id: lesson-008-032
title: Step 32
chapterId: chapter-08
order: 32
duration: 5
objectives:
  - Step 32
---

# Step 32

Notice that, to create orange, you had to increase the intensity of red and decrease the intensity of the green `rgb` values. This is because orange is the combination of red and yellow.

To create the tertiary color spring green, combine cyan with green. Update the `rgb` function in the `.two` CSS rule so that green is at the max value, and set blue to `127`.

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

1. Your `.two` CSS rule should have a `background-color` property set to `rgb(0, 255, 127)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 617bc3386dc7d07d6469bf20*
