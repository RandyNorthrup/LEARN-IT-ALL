---
id: lesson-014-005
title: Step 6
chapterId: chapter-14
order: 5
duration: 5
objectives:
  - Step 6
---

# Step 6

CamperBot has now created a function called `changeBackgroundColor` that changes the background color of the page to a random color from the `darkColorsArr` array. The function also displays the hex code for that new color.

When they try to test out this function, they notice that the background color is not changing and the text shows the following:

```js
Hex Code: undefined
```

`undefined` is showing up here because the `color` variable is not being set correctly.

Fix the error in the `darkColorsArr[getRandomIndex]` line so that the `color` variable is set to a random color from the `darkColorsArr` array.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Build a random background color changer</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <h1>Random Background Color changer</h1>

    <main>
      <section class="bg-information-container">
        <p>Hex Code: <span id="bg-hex-code">#110815</span></p>
      </section>

      <button class="btn" id="btn">Change Background Color</button>
    </main>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should call the `getRandomIndex` function inside the `darkColorsArr[getRandomIndex]` line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 663260de72634166b0800fe9*
