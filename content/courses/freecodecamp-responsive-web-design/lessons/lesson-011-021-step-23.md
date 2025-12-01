---
id: lesson-011-021
title: Step 23
chapterId: chapter-11
order: 21
duration: 5
objectives:
  - Step 23
---

# Step 23

Rotate the `.back-mountain` element by `45deg` clockwise. Then, give it a `left` property of `110px`, and a `top` property of `225px`.

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
    <div class="penguin"></div>
    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `transform` property to rotate the element.
2. if (backMountain?.transform) {
  assert.notEmpty(backMountain?.transform);
} else {
  assert.notEmpty(backMountain?.rotate);
}
3. You should give `.back-mountain` a `transform` of `--fcc-expected--`, but found `--fcc-actual--`.
4. if (backMountain?.transform) {
  assert.equal(backMountain?.transform, 'rotate(45deg)');
} else {
  assert.equal(backMountain?.rotate, '45deg');
}
5. You should give `.back-mountain` a `left` property.
6. You should give `.back-mountain` a `left` property of `--fcc-expected--`, but found `--fcc-actual--`.
7. You should give `.back-mountain` a `top` property.
8. You should give `.back-mountain` a `top` property of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6196d1ac33c68d27dcda5796*
