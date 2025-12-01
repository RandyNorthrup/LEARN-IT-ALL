---
id: lesson-007-018
title: Step 19
chapterId: chapter-07
order: 18
duration: 5
objectives:
  - Step 19
---

# Step 19

Now give the `@keyframes wheel` rule a `100%` selector. Within that, set the `transform` to `rotate(360deg)`. By doing this, your animation will now complete a full rotation.

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

1. Your `@keyframes wheel` rule should have a `100%` selector.
2. Your `100%` selector should come after your `0%` selector.
3. Your `100%` selector should have a `transform` property set to `rotate(360deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140de31b1f5b420410728ff*
