---
id: lesson-011-083
title: Step 84
chapterId: chapter-11
order: 83
duration: 5
objectives:
  - Step 84
---

# Step 84

To make the penguin's feet look more _penguiny_, rotate the left foot by `80deg`, and the right by `-80deg`.

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

1. You should give `.foot.left` a `transform` of `rotate(80deg)`.
2. if (leftFoot?.transform) {
  assert.equal(leftFoot.getPropVal('transform', true), 'rotate(80deg)');
} else {
  assert.equal(leftFoot.getPropVal('rotate', true), '80deg');
}
3. You should give `.foot.right` a `transform` of `rotate(-80deg)`.
4. if (rightFoot?.transform) {
  assert.equal(rightFoot.getPropVal('transform', true), 'rotate(-80deg)');
} else {
  assert.equal(rightFoot.getPropVal('rotate', true), '-80deg');
}

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d229b0e542520cd91c685*
