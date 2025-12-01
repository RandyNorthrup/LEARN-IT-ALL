---
id: lesson-011-047
title: Step 48
chapterId: chapter-11
order: 47
duration: 5
objectives:
  - Step 48
---

# Step 48

Currently, the two `.face` elements are on top of each other.

Fix this, by adding a `class` of `left` to the first `.face` element, and a `class` of `right` to the second `.face` element.

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
--fcc-editable-region--
      <div class="penguin-head">
        <div class="face"></div>
        <div class="face"></div>
      </div>
--fcc-editable-region--
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give a `class` of `left` to the first `.face` element.
2. You should give a `class` of `right` to the second `.face` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d019488f98c06acbbb71a*
