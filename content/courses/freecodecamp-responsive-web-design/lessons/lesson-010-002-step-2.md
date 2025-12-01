---
id: lesson-010-002
title: Step 2
chapterId: chapter-10
order: 2
duration: 5
objectives:
  - Step 2
---

# Step 2

Add a `title` element with the text `Magazine`, a `link` element for the `https://fonts.googleapis.com/css?family=Anton%7CBaskervville%7CRaleway&display=swap` font stylesheet, a `link` for the `https://use.fontawesome.com/releases/v5.8.2/css/all.css` FontAwesome stylesheet, and a `link` for your `./styles.css` stylesheet.

Your font stylesheet will load three separate fonts: `Anton`, `Baskervville`, and `Raleway`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
--fcc-editable-region--
  <body>
  </body>
</html>
```

## Hints

1. Your code should have three `link` elements.
2. Your `link` elements should be inside your `head` element.
3. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.strictEqual(headElement.querySelectorAll('link')?.length, 3);
4. Your three `link` elements should have a `rel` attribute with the value `stylesheet`.
5. One of your link elements should have the `href` set to `https://fonts.googleapis.com/css?family=Anton%7CBaskervville%7CRaleway&display=swap`.
6. One of your link elements should have the `href` set to `https://use.fontawesome.com/releases/v5.8.2/css/all.css`.
7. One of your `link` elements should have the `href` set to `styles.css`.
8. Your code should have a `title` element.
9. Your code should have one `title` element.
10. Your `title` element should be inside your `head` element.
11. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('title'));
12. Your project should have a title of `Magazine`. Remember, the casing and spelling matter for the title.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614385513d91ae5c251c2052*
