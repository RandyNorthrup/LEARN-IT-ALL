---
id: lesson-021-015
title: Step 15
chapterId: chapter-21
order: 15
duration: 5
objectives:
  - Step 15
---

# Step 15

You need to match a number before the text `dollars`. While you could write out `0|1|2` and so on, regular expressions have a feature that makes this easier.

A <dfn>character class</dfn> is defined by square brackets, and matches any character within the brackets. For example, `[aeiou]` matches any character in the list `aeiou`. You can also define a range of characters to match using a hyphen. For example, `[a-z]` matches any character from `a` to `z`.

Add a character class to match the digits `0` through `9` to your `dollarRegex` expression - remember the digit must come before the word `dollars`, and there should be a space between the digit and the word.

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

1. Your `dollarRegex` should use a character class.
2. Your character class should be `0-9`.
3. Your `dollarRegex` should still match `"1 dollars"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642206e054eef81b5e3092ed*
