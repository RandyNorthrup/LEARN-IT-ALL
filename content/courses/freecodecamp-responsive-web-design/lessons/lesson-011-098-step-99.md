---
id: lesson-011-098
title: Step 99
chapterId: chapter-11
order: 98
duration: 5
objectives:
  - Step 99
---

# Step 99

For the third and fourth waypoints, repeat the `transform` pattern once more.

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

1. You should give the `30%` waypoint a `transform` of `rotate(110deg) scaleX(-1)`.
2. if (rotateProp && transformProp) {
  assert(rotateProp === '110deg');
  assert(transformProp === 'scaleX(-1)');
} else {
  assert(transformProp === 'rotate(110deg)scaleX(-1)');
}
3. You should give the `40%` waypoint a `transform` of `rotate(130deg) scaleX(-1)`.
4. if (rotateProp && transformProp) {
  assert(rotateProp === '130deg');
  assert(transformProp === 'scaleX(-1)');
} else {
  assert(transformProp === 'rotate(130deg)scaleX(-1)');
}

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d337765b9f02c10e93722*
