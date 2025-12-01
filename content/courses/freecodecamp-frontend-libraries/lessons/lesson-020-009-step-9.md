---
id: lesson-020-009
title: Step 9
chapterId: chapter-20
order: 9
duration: 5
objectives:
  - Step 9
---

# Step 9

Now, you need to get the first number in the `0/10` text, in a way that will work even for `5/10` or `10/10`.

Parse the text content of the `.count` element to extract the current number.

Convert the count from a string to a number.

Log the current count in this format: `console.log("Current count:", currCount)`.

Hint: remember you can use the `split` method to divide a string into an array of substrings.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Emoji Reactor</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <main>

    <h1 class="title">How are you feeling today?</h1>

    <p class="description">
      Click on the buttons below to rate your emotions.
    </p>
    <div class="btn-container">
      <button id="happy-btn" class="emoji-btn" aria-label="Happy face emoji">
        <span role="img" aria-hidden="true">😊</span>
        <span class="count">0/10</span>
      </button>
    </div>
  </main>
  <script src="./script.js"></script>
</body>
</html>
```

## Hints

1. You should log the current count as a number.
2. assert.sameDeepOrderedMembers(spy.calls[0], ["Current count:", 0]);
3. You should log the current count as a number in a way that works for the various possible values.
4. assert.sameDeepOrderedMembers(spy.calls, [["Current count:", 5]]);
5. const testString2 = "10/10";
document.querySelector("#happy-btn .count").textContent = testString2;
document.querySelector(`#happy-btn`).click();
6. assert.sameDeepOrderedMembers(spy.calls[1], ["Current count:", 10]);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 689b15aacce1ae176ec768dc*
