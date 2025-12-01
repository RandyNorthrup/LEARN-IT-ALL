---
id: lesson-014-006
title: Step 7
chapterId: chapter-14
order: 6
duration: 5
objectives:
  - Step 7
---

# Step 7

CamperBot is trying to create a new variable called `btn` to store the reference to the button element with the `id` of `click-btn`

However, when they try to log the button element to the console, they see that the button element is `null`. 

Open up the `index.html` to see the correct `id` name for that button element. 

Then fix the error for the `document.querySelector("#click-btn");` line.

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

1. You should fix the `id` name of `"#click-btn"` line to match the correct `id` name in the `index.html` file.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66326637df347d6ae9928853*
