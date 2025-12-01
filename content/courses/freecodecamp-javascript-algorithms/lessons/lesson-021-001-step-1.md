---
id: lesson-021-001
title: Step 1
chapterId: chapter-21
order: 1
duration: 5
objectives:
  - Step 1
---

# Step 1

To begin the project, use the `.getElementById()` method to retrieve the `#message-input`, `#result`, and `#check-message-btn` elements from the HTML document, and assign them to the variables `messageInput`, `result`, and `checkMessageButton`, respectively.

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

1. You should use `const` to declare a `messageInput` variable.
2. Your `messageInput` variable should have the value of `document.getElementById("message-input")`.
3. You should use `const` to declare a `result` variable.
4. Your `result` variable should have the value of `document.getElementById("result")`.
5. You should use `const` to declare a `checkMessageButton` variable.
6. Your `checkMessageButton` variable should have the value of `document.getElementById("check-message-btn")`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641cd18eb67c661d8a9e11f3*
