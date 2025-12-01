---
id: lesson-008-005
title: Step 5
chapterId: chapter-08
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

You can have multiple `meta` elements on a web page. Each `meta` element adds information about the page that cannot be expressed by other HTML elements.

Add another `meta` element within the `head`. Give it a `name` attribute set to `"viewport"` and a `content` attribute set to `"width=device-width, initial-scale=1.0"` so your page looks the same on all devices.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="utf-8">
    <title>Colored Markers</title>
  </head>
--fcc-editable-region--
  <body>
  </body>
</html>
```

## Hints

1. You should have two `meta` elements.
2. Your new `meta` element should be a void element, it should not have a closing tag `</meta>`.
3. Your new `meta` element should have a `name` attribute set to `"viewport"`, and a `content` attribute set to `"width=device-width, initial-scale=1.0"`.
4. Your two `meta` elements should be inside the `head` element.
5. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.strictEqual(headElement.querySelectorAll('meta').length, 2);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 616965351e74d4689eb6de30*
