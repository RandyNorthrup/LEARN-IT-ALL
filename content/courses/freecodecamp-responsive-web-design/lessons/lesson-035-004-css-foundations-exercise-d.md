---
id: lesson-035-004
title: CSS Foundations Exercise D
chapterId: chapter-35
order: 4
duration: 5
objectives:
  - CSS Foundations Exercise D
---

# CSS Foundations Exercise D

With this exercise, we've provided you a completed HTML file, so you will only have to edit the CSS file. For this exercise, it's more important to understand how chaining different selectors works than how to actually add the attributes.

1. You should see a `width` of `300px` on the `avatar` and `proportioned` class.
1. You should give it a height so that it retains its original square proportions (don't hardcode in a pixel value for the height!).
1. You should give the elements with both the `avatar` and `distorted` classes a `width` of `200px`.
1. You should give it a `height` twice as big as it's width.

## Hints

1. You should have a `width` of `300px` on the `avatar` and `proportioned` class.
2. You should have a height of `auto` on the `avatar` and `proportioned` class.
3. You should use a chaining selector on the `avatar` and `proportioned` class.
4. You should have a `width` of `200px` on the `avatar` and `distorted` class.
5. You should use a chaining selector on the `avatar` and `distorted` class.
6. You should have a `height` two times the width on the `avatar` and `distorted` class.

## Solution

```html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Chaining Selectors</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <!-- Use the classes BELOW this line -->
    <div>
      <img class="avatar proportioned" src="https://cdn.freecodecamp.org/curriculum/odin-project/css-foundations/css-foundations-01.jpg" alt="Two kittens on a blanket.">
      <img class="avatar distorted" src="https://cdn.freecodecamp.org/curriculum/odin-project/css-foundations/css-foundations-02.jpg" alt="A cute kitten in the woods.">
    </div>
    <!-- Use the classes ABOVE this line -->
    <div>
      <img class="avatar proportioned" src="https://cdn.freecodecamp.org/curriculum/odin-project/css-foundations/css-foundations-01.jpg" alt="Two kittens on a blanket.">
      <img class="avatar distorted" src="https://cdn.freecodecamp.org/curriculum/odin-project/css-foundations/css-foundations-02.jpg" alt="A cute kitten in the woods.">
  </body>
</html>
```

```css
.avatar.proportioned {
  height: auto;
  width: 300px;
}

.avatar.distorted {
  height: 400px;
  width: 200px;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee3ff1381756f9716727f2*
