---
id: lesson-008-071
title: Step 81
chapterId: chapter-08
order: 71
duration: 5
objectives:
  - Step 81
---

# Step 81

Your border should be visible now. If no color is set, black is used by default.

But to make your code more readable, it's better to set the border color explicitly.

In the `.sleeve` CSS rule, add the `border-left-color` property with the value `black`.

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
        <div class="cap"></div>
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

1. Your `.sleeve` CSS rule should have a `border-left-color` property and with the value `black`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61add929e41980b1edbdba7e*
