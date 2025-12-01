---
id: lesson-014-001
title: Step 2
chapterId: chapter-14
order: 1
duration: 5
objectives:
  - Step 2
---

# Step 2

Now, CamperBot is trying to create a function that will return a random index from the `darkColorsArr`. But they have run into the following error message:

```js
Uncaught ReferenceError: math is not defined
```

A `ReferenceError` is thrown when a non-existent variable is referenced. In this case, it looks like CamperBot is trying to use `math` but JavaScript doesn't have a `math` object.

Fix CamperBot's error in the `math.random()` line and open up the console again.

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

1. You should fix the capitalization error in the `math.random()` line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66323433f931ca32305a11f5*
