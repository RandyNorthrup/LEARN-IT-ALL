---
id: lesson-012-004
title: Step 4
chapterId: chapter-12
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

Within the `head`, nest a `meta` element with a `charset` of `UTF-8`, a `title` element with a title of `City Skyline`, and a `link` element that links your `styles.css` file.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    
  </head>
--fcc-editable-region--
  <body>
  </body>
</html>
```

## Hints

1. You should create a `meta` element within the `head` element.
2. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('meta'));
3. You should give the `meta` tag a `charset` of `UTF-8`.
4. Your code should have a `title` element.
5. The `title` element should be within the `head` element.
6. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('title'));
7. Your project should have a title of `City Skyline`.
8. Remember, the casing and spelling matters for the title.
9. Your code should have a `link` element.
10. You should not change your existing `head` tags. Make sure you did not delete the closing tag.
11. You should have one void `link` element.
12. Your `link` element should be within your `head` element.
13. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('link'));
14. Your `link` element should have a `rel` attribute with the value `stylesheet`.
15. Your `link` element should have an `href` attribute with the value `styles.css`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98cc*
