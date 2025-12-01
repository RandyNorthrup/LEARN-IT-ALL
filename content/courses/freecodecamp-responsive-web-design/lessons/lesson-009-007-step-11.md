---
id: lesson-009-007
title: Step 11
chapterId: chapter-09
order: 7
duration: 5
objectives:
  - Step 11
---

# Step 11

Now your images are too big.

Create a `.gallery img` selector to target them. Give them all a `width` of `100%` and a `max-width` of `350px`.

Also set the `height` property to `300px` to keep your images a uniform size.

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

1. You should have a `.gallery img` selector.
2. Your `.gallery img` selector should have a `width` property set to `100%` as the value.
3. Your `.gallery img` selector should have a `max-width` property set to `350px` as the value.
4. Your `.gallery img` selector should have a `height` property set to `300px` as the value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 615380dff67172357fcf0425*
