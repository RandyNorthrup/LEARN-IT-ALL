---
id: lesson-021-019
title: Step 19
chapterId: chapter-21
order: 19
duration: 5
objectives:
  - Step 19
---

# Step 19

Now that you have your capture group, you can mark the entire pattern as an optional match. The `?` quantifier matches zero or one occurrence of the preceding character or group. For example, the regular expression `/colou?r/` matches both `color` and `colour`, because the `u` is optional.

Mark your capture group as optional.

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

1. Your `dollarRegex` should use the `?` quantifier.
2. Your `(hundred|thousand|million|billion)` capture group should be optional.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64220fb017c57d20612de8b8*
