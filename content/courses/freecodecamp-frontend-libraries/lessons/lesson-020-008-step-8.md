---
id: lesson-020-008
title: Step 8
chapterId: chapter-20
order: 8
duration: 5
objectives:
  - Step 8
---

# Step 8

Now replace the content of the event listener callback.

Use `querySelector` to find the `.count` element within the button.

Then log the text content of the `.count` element when the button is clicked.

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

1. You should log the text content of the `.count` element inside the clicked button.
2. assert.sameDeepOrderedMembers(spy.calls, [[testString]]);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 689af0bf1c707336ee9a1842*
