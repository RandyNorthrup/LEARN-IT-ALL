---
id: lesson-021-006
title: Step 6
chapterId: chapter-21
order: 6
duration: 5
objectives:
  - Step 6
---

# Step 6

Your first regular expression will be used to catch help requests. Declare a `helpRegex` variable, and assign it a regular expression that matches the string `please help`.

As a refresher, here is a regular expression to match the string `hello world`:

```js
const regex = /hello world/;
```

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

1. You should use `const` to declare a `helpRegex` variable.
2. Your `helpRegex` variable should be a regular expression.
3. Your `helpRegex` variable should match the string `please help`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641ce03dfeca10293e05dad7*
