---
id: lesson-011-087
title: Step 88
chapterId: chapter-11
order: 87
duration: 5
objectives:
  - Step 88
---

# Step 88

Create a custom CSS variable named `--penguin-skin`, and set it to `gray`. Then, replace all relevant property values with it.

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

1. You should give `:root` a `--penguin-skin` property.
2. You should give `--penguin-skin` a value of `gray`, but found `--fcc-actual--`.
3. You should give `.penguin-head` a `background` of `linear-gradient(45deg, var(--penguin-skin), rgb(239, 240, 228))`.
4. You should give `.penguin-body::before` a `background-color` of `var(--penguin-skin)`, but found `--fcc-actual--`.
5. You should give `.arm` a `background` of `linear-gradient(90deg, var(--penguin-skin), rgb(209, 210, 199))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d2712853306238f41828e*
