---
id: lesson-021-003
title: Step 3
chapterId: chapter-21
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

If the `messageInput` is empty, display an alert to the user with the message `"Please enter a message."`.

Then, exit the function execution.

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

1. Your callback function should have an `if` statement.
2. Your `if` statement should check if the `value` of `messageInput` is an empty string.
3. Your `if` statement should display an alert to the user with the message `"Please enter a message."`.
4. Your `if` statement should exit the function execution.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641cdebe67ec0f25a4798356*
