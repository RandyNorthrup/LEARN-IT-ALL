---
id: lesson-011-086
title: Step 87
chapterId: chapter-11
order: 86
duration: 5
objectives:
  - Step 87
---

# Step 87

Target the `.arm` elements, and give them a `width` of `30%`, a `height` of `60%`, and a `background` of linear gradient at `90deg` from clockwise, starting at `gray`, and ending at `rgb(209, 210, 199)`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Penguin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body>
    <div class="left-mountain"></div>
    <div class="back-mountain"></div>
    <div class="sun"></div>
    <div class="penguin">
      <div class="penguin-head">
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="chin"></div>
        <div class="eye left">
          <div class="eye-lid"></div>
        </div>
        <div class="eye right">
          <div class="eye-lid"></div>
        </div>
        <div class="blush left"></div>
        <div class="blush right"></div>
        <div class="beak top"></div>
        <div class="beak bottom"></div>
      </div>
      <div class="shirt">
        <div>💜</div>
        <p>I CSS</p>
      </div> 
      <div class="penguin-body">
        <div class="arm left"></div>
        <div class="arm right"></div>
        <div class="foot left"></div>
        <div class="foot right"></div>
      </div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.arm` selector.
2. You should give `.arm` a `width` of `--fcc-expected--`, found `--fcc-actual--`.
3. You should give `.arm` a `height` of `--fcc-expected--`, found `--fcc-actual--`.
4. You should give `.arm` a `background` of `linear-gradient(90deg, gray, rgb(209, 210, 199))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d26b12e651022d80cd017*
