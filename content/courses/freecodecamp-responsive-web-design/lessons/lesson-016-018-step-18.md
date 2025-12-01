---
id: lesson-016-018
title: Step 18
chapterId: chapter-16
order: 18
duration: 5
objectives:
  - Step 18
---

# Step 18

Now it is time to use the pseudo-selectors you prepared for earlier. To create the black keys, add a new `.key.black--key::after` selector. This will target the elements with the class `key black--key`, and select the pseudo-element after these elements in the HTML.

In the new selector, set the `background-color` to `#1d1e22`. Also set the `content` property to `""`. This will make the pseudo-elements empty.

The `content` property is used to set or override the content of the element. By default, the pseudo-elements created by the `::before` and `::after` pseudo-selectors are empty, and the elements will not be rendered to the page. Setting the `content` property to an empty string `""` will ensure the element is rendered to the page while still being empty.

If you would like to experiment, try removing the `background-color` property and setting different values for the `content` property, such as `"♥"`. Remember to undo these changes when you are done so the tests pass.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Piano</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./styles.css">
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

1. You should have a `.key.black--key::after` selector.
2. Your `.key.black--key::after` selector should have a `background-color` property set to `#1d1e22`.
3. Your `.key.black--key::after` selector should have a `content` property set to `""`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 612ea4c4993aba52ab4aa32e*
