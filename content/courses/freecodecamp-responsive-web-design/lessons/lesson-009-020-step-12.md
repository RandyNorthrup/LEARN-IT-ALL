---
id: lesson-009-020
title: Step 12
chapterId: chapter-09
order: 20
duration: 5
objectives:
  - Step 12
---

# Step 12

Remove the margin from your body element, set the `font-family` to `sans-serif`, and give it a `background-color` of `#f5f6f7` as the value.

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

1. You should have a `body` selector.
2. Your `body` selector should have a `margin` property set to 0 as the value.
3. assert.equal(new __helpers.CSSHelp(document).getStyle('body')?.marginBottom, '0px');
4. assert.equal(new __helpers.CSSHelp(document).getStyle('body')?.marginLeft, '0px');
5. assert.equal(new __helpers.CSSHelp(document).getStyle('body')?.marginRight, '0px');
6. Your `body` selector should have a `font-family` property set to `sans-serif` as the value.
7. Your `body` selector should have a `background-color` property set to `#f5f6f7` as the value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 615f171d05def3218035dc85*
