---
id: lesson-007-021
title: Step 22
chapterId: chapter-07
order: 21
duration: 5
objectives:
  - Step 22
---

# Step 22

Create another `@keyframes` rule with the name `cabins`. Use the same properties as your `@keyframes wheel`, copying both the `0%` and `100%` rules, but set the `transform` property of the `100%` selector to `rotate(-360deg)`.

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

1. You should have a `@keyframes` rule.
2. Your new `@keyframes` rule should be named `cabins`.
3. Your new `@keyframes` rule should come after your `@keyframes wheel` rule.
4. You should not change the name of your `@keyframes wheel` rule.
5. Your `@keyframes cabins` rule should have a `0%` selector.
6. Your `0%` selector should have a `transform` property set to `rotate(0deg)`.
7. Your `@keyframes cabins` rule should have a `100%` selector.
8. Your `100%` selector should come after your `0%` selector.
9. Your `100%` selector should have a `transform` property set to `rotate(-360deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140f4b5c1555a2960de1e5f*
