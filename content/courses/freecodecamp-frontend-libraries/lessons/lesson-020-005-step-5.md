---
id: lesson-020-005
title: Step 5
chapterId: chapter-20
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

Now it's time to link the JavaScript file.

Add a `script` element right before the closing tag of the `body` element with the right attribute and value to link the `script.js` file.

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
--fcc-editable-region--

--fcc-editable-region--
</body>
</html>
```

## Hints

1. You should have a `script` element.
2. The `script` element should have a `src` of `./script.js`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 6899b7755876b10444ae3bcd*
