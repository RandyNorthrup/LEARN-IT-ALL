---
id: lesson-009-015
title: Step 20
chapterId: chapter-09
order: 15
duration: 5
objectives:
  - Step 20
---

# Step 20

Notice how some of your images have become distorted. This is because the images have different aspect ratios. Rather than setting each aspect ratio individually, you can use the `object-fit` property to determine how images should behave.

Give your `.gallery img` selector the `object-fit` property and set it to `cover`. This will tell the image to fill the `img` container while maintaining aspect ratio, resulting in cropping to fit.

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

1. Your `.gallery img` selector should have an `object-fit` property set to `cover` as the value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61539f32a206bd53ec116465*
