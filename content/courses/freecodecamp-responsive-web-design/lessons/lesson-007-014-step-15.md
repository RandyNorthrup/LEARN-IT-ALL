---
id: lesson-007-014
title: Step 15
chapterId: chapter-07
order: 14
duration: 5
objectives:
  - Step 15
---

# Step 15

Continuing the pattern, select the following `.cabin` elements and apply the specific rules to them:

- The second `.cabin` should have the `right` property set to `17%` and the `top` property set to `93.5%`.
- The third `.cabin` should have the `right` property set to `67%` and the `top` property set to `93.5%`.
- The fourth `.cabin` should have the `left` property set to `-8.5%` and the `top` property set to `50%`.
- The fifth `.cabin` should have the `left` property set to `17%` and the `top` property set to `7%`.
- The sixth `.cabin` should have the `right` property set to `17%` and the `top` property set to `7%`.

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

1. You should have a `.cabin:nth-of-type(2)` selector.
2. Your `.cabin:nth-of-type(2)` selector should have a `right` property set to `17%`.
3. Your `.cabin:nth-of-type(2)` selector should have a `top` property set to `93.5%`.
4. You should have a `.cabin:nth-of-type(3)` selector.
5. Your `.cabin:nth-of-type(3)` selector should have a `right` property set to `67%`.
6. Your `.cabin:nth-of-type(3)` selector should have a `top` property set to `93.5%`.
7. You should have a `.cabin:nth-of-type(4)` selector.
8. Your `.cabin:nth-of-type(4)` selector should have a `left` property set to `-8.5%`.
9. Your `.cabin:nth-of-type(4)` selector should have a `top` property set to `50%`.
10. You should have a `.cabin:nth-of-type(5)` selector.
11. Your `.cabin:nth-of-type(5)` selector should have a `left` property set to `17%`.
12. Your `.cabin:nth-of-type(5)` selector should have a `top` property set to `7%`.
13. You should have a `.cabin:nth-of-type(6)` selector.
14. Your `.cabin:nth-of-type(6)` selector should have a `right` property set to `17%`.
15. Your `.cabin:nth-of-type(6)` selector should have a `top` property set to `7%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d4bc9db3c81c51a09ab7*
