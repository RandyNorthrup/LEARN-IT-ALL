---
id: lesson-021-028
title: Step 29
chapterId: chapter-21
order: 28
duration: 5
objectives:
  - Step 29
---

# Step 29

Your next regular expression will match strings like `stock alert`. Declare a `stockRegex` variable and assign it a regular expression that will match the string `stock alert`. Remember to make it case insensitive.

Add it to your `denyList` array as well.

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

1. You should use `const` to declare your `stockRegex` variable.
2. Your `stockRegex` variable should be assigned a regular expression.
3. Your `stockRegex` should match `stock alert`.
4. Your `stockRegex` should be case-insensitive.
5. Your `denyList` array should contain `stockRegex`.
6. Your `denyList` array should contain `freeRegex`.
7. Your `denyList` array should contain `dollarRegex`.
8. Your `denyList` array should contain `helpRegex`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64233d08f234a310e73f9496*
