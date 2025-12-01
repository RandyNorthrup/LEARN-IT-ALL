---
id: lesson-021-013
title: Step 13
chapterId: chapter-21
order: 13
duration: 5
objectives:
  - Step 13
---

# Step 13

The next regular expression you will work on is one that matches mentions of dollar amounts.

Start by declaring a `dollarRegex` variable, and assign it a case-insensitive regular expression that matches the text `dollars`.

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

1. You should use `const` to declare a `dollarRegex` variable.
2. Your `dollarRegex` variable should be a regular expression.
3. Your `dollarRegex` should match `dollars`.
4. Your `dollarRegex` should be case-insensitive.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642205fa6376c818f78bb24e*
