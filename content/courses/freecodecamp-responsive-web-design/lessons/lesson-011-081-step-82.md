---
id: lesson-011-081
title: Step 82
chapterId: chapter-11
order: 81
duration: 5
objectives:
  - Step 82
---

# Step 82

The penguin's beak and feet share the same `color`.

Create a new custom CSS variable named `--penguin-picorna`, and replace all relevant property values with it.

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
        <div class="foot left"></div>
        <div class="foot right"></div>
      </div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give `:root` a `--penguin-picorna` property.
2. You should give `--penguin-picorna` a value of `orange`, but found `--fcc-actual--`.
3. You should give `.beak` a `background-color` of `var(--penguin-picorna)`, but found `--fcc-actual--`.
4. You should give `.foot` a `background-color` of `var(--penguin-picorna)`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d20b12996101f430920fb*
