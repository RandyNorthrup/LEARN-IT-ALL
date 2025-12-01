---
id: lesson-014-004
title: Step 5
chapterId: chapter-14
order: 4
duration: 5
objectives:
  - Step 5
---

# Step 5

CamperBot has created a new variable called `bgHexCodeSpanElement` to store the reference to the `span` element with the `id` of `bg-hex-code`. However, when they try to log that variable to the console, they get `null`. 

`null` is a special value in JavaScript that represents the absence of a value. This can happen when you try to access a property of an object that doesn't exist. 

In this case, CamperBot is not passing in the correct selector to the `document.querySelector` method.

Fix the `document.querySelector("bg-hex-code")` line so that it correctly selects the element with the `id` of `bg-hex-code`.

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

1. You should fix `"bg-hex-code"` so it correctly references the `id` of `bg-hex-code`. Remember that `id` selectors in CSS start with a hash symbol (`#`).

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66325a250690a3612c1db0f6*
