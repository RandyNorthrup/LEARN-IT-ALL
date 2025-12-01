---
id: lesson-009-021
title: Step 9
chapterId: chapter-09
order: 21
duration: 5
objectives:
  - Step 9
---

# Step 9

The `border-box` sizing model does the opposite of `content-box`. The total width of the element, including padding and border, will be the explicit width set. The content of the element will shrink to make room for the padding and border.

Change the `box-sizing` property to `border-box`. Notice how your blue image borders now fit within your red gallery border.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <header class="header">
      <h1>css flexbox photo gallery</h1>
    </header>
    <div class="gallery">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/2.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/3.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/4.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/5.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/6.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/7.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/8.jpg">
      <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/9.jpg">
    </div>
  </body>
</html>
```

## Hints

1. Your * selector should have a `box-sizing` property set to `border-box` as the value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6493bc0d99879635209565aa*
