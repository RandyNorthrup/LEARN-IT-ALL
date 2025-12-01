---
id: lesson-011-014
title: Step 16
chapterId: chapter-11
order: 14
duration: 5
objectives:
  - Step 16
---

# Step 16

To make the mountain look more like a mountain, you can use the `skew` transform function, which takes two arguments. The first being an angle to shear the x-axis by, and the second being an angle to shear the y-axis by.

Use the `transform` property to skew the mountain by `0deg` in the x-axis and `44deg` in the y-axis.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Penguin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body>
    <div class="left-mountain"></div>
    <div class="penguin"></div>
    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give `.left-mountain` a `transform` property.
2. You should use the `skew` function on `transform`.
3. You should give `.left-mountain` a `transform` of `skew(0deg, 44deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61969e7451455614217e901b*
