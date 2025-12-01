---
id: lesson-008-069
title: Step 79
chapterId: chapter-08
order: 69
duration: 5
objectives:
  - Step 79
---

# Step 79

In the last project, you learned a little bit about borders and the `border-color` property.

All HTML elements have borders, though they're usually set to `none` by default. With CSS, you can control all aspects of an element's border, and set the border on all sides, or just one side at a time. For a border to be visible, you need to set its width and style.

In the `.sleeve` CSS rule, add the `border-left-width` property with the value `10px`.

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

1. Your `.sleeve` CSS rule should have a `border-left-width` property and with the value `10px`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61adc91467b5d59328b9f781*
