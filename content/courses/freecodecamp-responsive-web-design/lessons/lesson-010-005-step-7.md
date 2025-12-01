---
id: lesson-010-005
title: Step 7
chapterId: chapter-10
order: 5
duration: 5
objectives:
  - Step 7
---

# Step 7

After your `header` element, create a `div` with the `class` set to `author`.

Within that `div`, create a `p` element with the `class` set to `author-name` and give it the text `By freeCodeCamp`. Wrap the `freeCodeCamp` portion in an `a` element with the `href` set to `https://freecodecamp.org`, and the `target` set to `_blank`.


Below that, add a second `p` element with the class `publish-date` and the text `March 7, 2019`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Magazine</title>
    <link
      href="https://fonts.googleapis.com/css?family=Anton%7CBaskervville%7CRaleway&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main>
      <section class="heading">
        <header class="hero">
          <img
            src="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"
            alt="freecodecamp logo"
            loading="lazy"
            class="hero-img"
            width="400"
          />
          <h1 class="hero-title">OUR NEW CURRICULUM</h1>
          <p class="hero-subtitle">
            Our efforts to restructure our curriculum with a more project-based
            focus
          </p>
        </header>
--fcc-editable-region--

      </section>
    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You should create a new `div` element.
2. Your `div` element should come after your `header` element.
3. Your `div` element should have the `class` set to `author`.
4. You should create two new `p` elements.
5. Your two new `p` elements should be within your `div` element.
6. Your first new `p` element should have a `class` set to `author-name`.
7. Your first new `p` element should have the text `By freeCodeCamp`.
8. Your second new `p` element should have a `class` set to `publish-date`.
9. Your second new `p` element should have the text `March 7, 2019`.
10. You should create a new `a` element.
11. Your `a` element should be within your first new `p` element.
12. Your `a` element should have the `href` set to `https://freecodecamp.org`.
13. Your `a` element should have the `target` set to `_blank`.
14. Your `a` element should surround the text `freeCodeCamp`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614387cbefeeba5f3654a291*
