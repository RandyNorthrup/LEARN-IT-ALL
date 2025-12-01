---
id: lesson-021-034
title: Step 35
chapterId: chapter-21
order: 34
duration: 5
objectives:
  - Step 35
---

# Step 35

Your final regular expression will look for strings like `dear friend`. Declare a `dearRegex` and assign it a regular expression that will match the string `dear friend`. Remember to make it case insensitive, and add it to your `denyList` array.

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

1. You should use `const` to declare your `dearRegex` variable.
2. Your `dearRegex` variable should be assigned a regular expression.
3. Your `dearRegex` should match `dear friend`.
4. Your `dearRegex` should be case-insensitive.
5. Your `denyList` array should contain `dearRegex`.
6. Your `denyList` array should contain `stockRegex`.
7. Your `denyList` array should contain `freeRegex`.
8. Your `denyList` array should contain `dollarRegex`.
9. Your `denyList` array should contain `helpRegex`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6423491485db5e1786dd6434*
