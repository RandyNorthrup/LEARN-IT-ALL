---
id: lesson-011-090
title: Step 91
chapterId: chapter-11
order: 90
duration: 5
objectives:
  - Step 91
---

# Step 91

To keep the linear gradient on the correct side of the penguin's left arm, first rotate it by `130deg`, then invert the x-axis.

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

1. You should give `.arm.left` a `transform` of `rotate(130deg) scaleX(-1)`.
2. if (leftArm?.rotate && leftArm?.transform) {
  assert.equal(leftArm.getPropVal('rotate', true), '130deg');
  assert.equal(leftArm.getPropVal('transform', true), 'scaleX(-1)');
} else {
  assert.equal(leftArm.getPropVal('transform', true), 'rotate(130deg)scaleX(-1)');
}

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d2d4e80400325ff89664a*
