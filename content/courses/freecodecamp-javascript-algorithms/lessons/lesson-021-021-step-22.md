---
id: lesson-021-021
title: Step 22
chapterId: chapter-21
order: 21
duration: 5
objectives:
  - Step 22
---

# Step 22

Your next regular expression will look for strings like `free money`. Start by declaring a `freeRegex` variable and assigning it a regular expression that will match the string `free money`. Remember to make it case-insensitive.

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

1. You should declare a `freeRegex` variable using `const`.
2. Your `freeRegex` variable should be a regular expression.
3. Your `freeRegex` should match `free money`.
4. Your `freeRegex` should be case-insensitive.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642213bf8d38b0227ed6ab0b*
