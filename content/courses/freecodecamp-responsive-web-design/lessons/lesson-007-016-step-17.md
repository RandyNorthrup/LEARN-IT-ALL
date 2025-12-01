---
id: lesson-007-016
title: Step 17
chapterId: chapter-07
order: 16
duration: 5
objectives:
  - Step 17
---

# Step 17

You now need to define how your animation should start. To do this, create a `0%` rule within your `@keyframes wheel` rule. The properties you set in this nested selector will apply at the beginning of your animation.

As an example, this would be a `12%` rule:

```css
@keyframes freecodecamp {
  12% {
    color: green;
  }
}
```

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Ferris Wheel</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <div class="wheel">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>

      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
    </div>
  </body>
</html>
```

## Hints

1. Your `@keyframes wheel` rule should have a `0%` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140dc5e13d0c81e7496f182*
