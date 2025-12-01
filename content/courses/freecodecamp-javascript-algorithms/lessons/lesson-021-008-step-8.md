---
id: lesson-021-008
title: Step 8
chapterId: chapter-21
order: 8
duration: 5
objectives:
  - Step 8
---

# Step 8

Strings have a `.match()` method, which accepts a regular expression as an argument and determines if the string matches that expression.

Update your `isSpam()` function to implicitly return the result of calling the `.match()` method on `msg`, passing `helpRegex` as the argument.

Then, try entering some messages on your page and see the result.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Learn Regular Expressions by Building a Spam Filter</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <header class="main-text">
      <h1 class="title">Is this Spam?</h1>
      <p class="description">
        Enter a phrase to check if it would be marked as spam or not.
      </p>
    </header>

    <main>
      <label class="message-label" for="message-input">Message: </label>
      <textarea
        placeholder="Enter message here"
        value=""
        type="text"
        name="message"
        id="message-input"
        rows="10"
        cols="40"
      ></textarea>
      <button class="btn" id="check-message-btn" type="button">
        Check message
      </button>
      <p id="result"></p>
    </main>

    <footer class="footer">&copy; freeCodeCamp</footer>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your `isSpam()` function should implicitly return the result of `msg.match(helpRegex)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641ce3dcd0aec8309fbc9971*
