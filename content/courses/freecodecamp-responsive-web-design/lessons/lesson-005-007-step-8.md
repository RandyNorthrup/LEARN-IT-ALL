---
id: lesson-005-007
title: Step 8
chapterId: chapter-05
order: 7
duration: 5
objectives:
  - Step 8
---

# Step 8

Currently, the `img` is assuming its default size, which is too large. CSS has a `max` function which returns the largest of a set of comma-separated values. For example:

```css
img {
  width: max(250px, 25vw);
}
```

In the above example, the width of the image will be 250px if the viewport width is less than 1000 pixels. If the viewport width is greater than 1000 pixels, the width of the image will be 25vw. This is because 25vw is equal to 25% of the viewport width.

Scale the image using its `id` as a selector, and setting the `width` to be the maximum of `10rem` or `18vw`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="freeCodeCamp Accessibility Quiz practice project" />
    <title>Accessibility Quiz</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <img id="logo" alt="freeCodeCamp" src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg">
      <h1>HTML/CSS Quiz</h1>
      <nav></nav>
    </header>
    <main></main>
  </body>
</html>
```

## Hints

1. You should use the `#logo` selector to target the `img` element.
2. You should give the `img` a `width` of `max(10rem, 18vw)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 613e275749ebd008e74bb62e*
