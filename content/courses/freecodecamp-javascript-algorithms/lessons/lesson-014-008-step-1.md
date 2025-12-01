---
id: lesson-014-008
title: Step 1
chapterId: chapter-14
order: 8
duration: 5
objectives:
  - Step 1
---

# Step 1

CamperBot is trying to build out a random background color changer. But they keep running into issues and need your help to debug the code. 

CamperBot has already added the HTML and CSS for the project. But they are confused as to why none of the styles and content is showing up on the page.

When they open up the console they see this message:

```js
SyntaxError: unknown: Unexpected token, expected "," (5:2)
```

Syntax errors are thrown when the JavaScript engine encounters something it can't interpret. In this case, it looks like CamperBot has syntax errors in the `darkColorsArr` array.

Fix the syntax errors in the `darkColorsArr` array and you should see the content and styles show up on the page.

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

1. You should resolve the syntax errors in the `darkColorsArr` array. Remember that array elements should be separated by commas.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6650c9a94d6e13d14a043a69*
