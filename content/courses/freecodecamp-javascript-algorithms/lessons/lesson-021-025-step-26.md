---
id: lesson-021-025
title: Step 26
chapterId: chapter-21
order: 25
duration: 5
objectives:
  - Step 26
---

# Step 26

Your regex should match whole words, not partial words. That is, you do not want to match `hands-free money management`.

To do this, start by checking for spaces before and after your pattern. You can do this by using the meta character `\s`, which will match spaces, tabs, and line breaks.

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

1. Your `freeRegex` should use the `\s` token.
2. Your `freeRegex` should look for spaces at the beginning and end of your pattern.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6423331f0527840934183aba*
