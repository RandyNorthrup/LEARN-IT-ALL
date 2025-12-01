---
id: lesson-011-078
title: Step 79
chapterId: chapter-11
order: 78
duration: 5
objectives:
  - Step 79
---

# Step 79

Fun fact: Penguins cannot stand without at least two feet.

Within the `.penguin-body` element, add two `div` elements each with a `class` of `foot`. Give the first `.foot` a `class` of `left`, and the second `.foot` a `class` of `right`.

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
--fcc-editable-region--
      <div class="penguin-body">

      </div>
--fcc-editable-region--
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should add two `div` elements within `.penguin-body`. Expected `--fcc-expected--` `div` elements, found `--fcc-actual--`.
2. You should give the first new `div` a `class` of `foot`.
3. You should give the second new `div` a `class` of `foot`.
4. You should give one `div` a `class` of `left`.
5. You should give the other `div` a `class` of `right`.
6. You should place `.foot.right` after `.foot.left`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d1ed33c9a071cf657a0d6*
