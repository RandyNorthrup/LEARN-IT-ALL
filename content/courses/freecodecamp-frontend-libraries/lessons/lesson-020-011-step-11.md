---
id: lesson-020-011
title: Step 11
chapterId: chapter-20
order: 11
duration: 5
objectives:
  - Step 11
---

# Step 11

You can make the code more reusable.

Create a function called `updateCount` that takes a button element as a parameter.

This function should contain all the logic for updating a button's count: finding the count element, parsing the current count, checking if it's at the maximum, incrementing, and updating the display.

Then update your event listener callback to call `updateCount(happyBtn)` instead of having the logic inline.

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

1. You should create a function named `updateCount`.
2. The `updateCount` function should take a button parameter.
3. The `updateCount` function should work correctly with any button element.
4. Your event listener should call `updateCount` with the button as an argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 68a9f8378ddba1261a268cce*
