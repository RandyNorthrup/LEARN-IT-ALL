---
id: lesson-021-005
title: Step 5
chapterId: chapter-21
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

Back in your event listener, you need to update the text of the `result` element. You can use a ternary operator to achieve this task.

Here is an example of assigning the result of a ternary operator to an element's text content:

```js
el.textContent = condition ? "Use this text if the condition is true" : "Use this text if the condition is false";
```

After the `if` statement, use a ternary operator to check the truthiness of calling `isSpam()` with `messageInput.value` as the argument. If true, set the `textContent` property on the `result` element to `"Oh no! This looks like a spam message."`. Otherwise, set it to `"This message does not seem to contain any spam."`

Then set the `messageInput` element's `value` property to an empty string.

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

1. You should use the assignment operator to set the `textContent` property of the `result` element.
2. You should call the `isSpam()` function after the assignment operator `=` and before the `?` ternary operator.
3. You should use ternary syntax to check the truthiness of `isSpam(messageInput.value)`.
4. The truthy expression of your ternary should set the `textContent` property of the `result` element to `"Oh no! This looks like a spam message."`.
5. The falsy expression of your ternary should set the `textContent` property of the `result` element to `"This message does not seem to contain any spam."`.
6. After your ternary, set the `value` property on the `messageInput` element to an empty string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641cdf57c3f7ee276e1d9b32*
