---
id: lesson-014-002
title: Step 3
chapterId: chapter-14
order: 2
duration: 5
objectives:
  - Step 3
---

# Step 3

Now that the `ReferenceError` is resolved, the console is displaying the correct results for a random number between `0` and `9`. But CamperBot was not expecting to see decimal numbers like these:

```js
0.015882899879771095
2.114596286197641
6.040964780197666
```

Update the `console` statement to print a whole number between `0` and `9`. 

Remember that you worked with a method in the Role Playing Game that rounds a number down to the nearest whole number.

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

1. You should round `darkColorsArr.length * Math.random()` down to the nearest whole number.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 663250b42513ef5975599c49*
