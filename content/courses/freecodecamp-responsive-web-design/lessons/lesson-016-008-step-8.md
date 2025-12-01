---
id: lesson-016-008
title: Step 8
chapterId: chapter-16
order: 8
duration: 5
objectives:
  - Step 8
---

# Step 8

Add a `link` element inside your `head` element. Give it a `rel` attribute set to `stylesheet` and an `href` attribute set to `styles.css`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    --fcc-editable-region--
    <meta charset="UTF-8" />
    <title>Piano</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    --fcc-editable-region--
  </head>
  <body>
    <div id="piano">
      <div class="keys">
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>

        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>

        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
      </div>
    </div>
  </body>
</html>
```

## Hints

1. Your code should have a `link` element.
2. You should not change your existing `head` tags. Make sure you did not delete the closing tag.
3. You should have one `link` element.
4. Your `link` element should be inside your `head` element.
5. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('link'));
6. Your `link` element should have a `rel` attribute with the value `stylesheet`.
7. Your `link` element should have an `href` attribute with the value `styles.css`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 612e83ec2eca1e370f830511*
