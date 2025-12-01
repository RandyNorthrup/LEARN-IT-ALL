---
id: lesson-008-007
title: Step 7
chapterId: chapter-08
order: 7
duration: 5
objectives:
  - Step 7
---

# Step 7

In this project you'll work with an external CSS file to style the page. We've already created a `styles.css` file for you. But before you can use it, you'll need to link it to the page.

Nest a `link` element within the `head` element. Give it a `rel` attribute set to `"stylesheet"` and an `href` attribute set to `"styles.css"`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  --fcc-editable-region--
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colored Markers</title>
  </head>
  --fcc-editable-region--
  <body>
    <h1>CSS Color Markers</h1>
  </body>
</html>
```

## Hints

1. You should have one `link` element.
2. Your `link` element should be a void element, it should not have a closing tag `</link>`.
3. Your `link` element should have a `rel` attribute with the value `"stylesheet"`.
4. Your `link` element should have an `href` attribute with the value `"styles.css"`.
5. Your `link` element should be inside the `head` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61696ef7ac756c829f9e4048*
