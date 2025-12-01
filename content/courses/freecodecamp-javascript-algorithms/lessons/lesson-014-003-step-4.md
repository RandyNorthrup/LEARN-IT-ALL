---
id: lesson-014-003
title: Step 4
chapterId: chapter-14
order: 3
duration: 5
objectives:
  - Step 4
---

# Step 4

CamperBot is finished with building out the `getRandomIndex` function and it is working as expected. 

But now they are running into this issue when trying to create a reference to the `body` element in the DOM:

```js
Uncaught TypeError: document.queryselector is not a function
```

A `TypeError` means that the code is trying to perform an operation on a value that is not of the expected type. 

Fix the `TypeError` by updating the `document.queryselector` method to the correct method name that selects an element from the DOM.

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

1. You should update `queryselector` to use camel case.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 663255f28c59315db74d137b*
