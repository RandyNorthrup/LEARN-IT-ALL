---
id: lesson-007-015
title: Step 16
chapterId: chapter-07
order: 15
duration: 5
objectives:
  - Step 16
---

# Step 16

The `@keyframes` at-rule is used to define the flow of a CSS animation. Within the `@keyframes` rule, you can create selectors for specific points in the animation sequence, such as `0%` or `25%`, or use `from` and `to` to define the start and end of the sequence.

`@keyframes` rules require a name to be assigned to them, which you use in other rules to reference. For example, the `@keyframes freeCodeCamp { }` rule would be named `freeCodeCamp`.

Time to start animating. Create a `@keyframes` rule named `wheel`.

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
2. Your new `@keyframes` rule should be named `wheel`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d94b5fab7f1d73c9bedb*
