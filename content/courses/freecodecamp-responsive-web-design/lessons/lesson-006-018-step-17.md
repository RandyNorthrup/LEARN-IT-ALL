---
id: lesson-006-018
title: Step 17
chapterId: chapter-06
order: 18
duration: 5
objectives:
  - Step 17
---

# Step 17

For the styling of the page to look similar on mobile as it does on a desktop or laptop, you need to add a `meta` element with a special `content` attribute.

Add the following within the `head` element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="utf-8" />
    <title>Cafe Menu</title>
    <link href="styles.css" rel="stylesheet"/>
  </head>
--fcc-editable-region--
  <body>
    <main>
      <h1>CAMPER CAFE</h1>
      <p>Est. 2020</p>
      <section>
        <h2>Coffee</h2>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your code should have two `meta` elements.
2. Your `meta` element should have a `name` attribute with a value of `viewport`.
3. Your `meta` element should have a `content` attribute with a value of `width=device-width, initial-scale=1.0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477cbcb6ba47918c1da92*
