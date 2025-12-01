---
id: lesson-010-007
title: Step 10
chapterId: chapter-10
order: 7
duration: 5
objectives:
  - Step 10
---

# Step 10

Within each of your new `a` elements, add an `i` element and give them the following classes:

- Your first `i` element should have the class `fab fa-facebook-f`
- Your second `i` element should have the class `fab fa-twitter`
- Your third `i` element should have the class `fab fa-instagram`
- Your fourth `i` element should have the class `fab fa-linkedin-in`
- Your fifth `i` element should have the class `fab fa-youtube`

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
        <div class="author">
          <p class="author-name">
            By
            <a href="https://freecodecamp.org" target="_blank" rel="noreferrer"
              >freeCodeCamp</a
            >
          </p>
          <p class="publish-date">March 7, 2019</p>
        </div>
--fcc-editable-region--
        <div class="social-icons">
          <a href="https://www.facebook.com/freecodecamp/">
          </a>
          <a href="https://twitter.com/freecodecamp/">
          </a>
          <a href="https://instagram.com/freecodecamp">
          </a>
          <a href="https://www.linkedin.com/school/free-code-camp/">
          </a>
          <a href="https://www.youtube.com/freecodecamp">
          </a>
        </div>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You should have five `i` elements.
2. Each `a` element should only have one `i` element.
3. Each `i` element should have a `class` attribute which includes `fab`.
4. The first `i` element should have a `class` attribute which includes `fa-facebook-f`.
5. The second `i` element should have a `class` attribute which includes `fa-twitter`.
6. The third `i` element should have a `class` attribute which includes `fa-instagram`.
7. The fourth `i` element should have a `class` attribute which includes `fa-linkedin-in`.
8. The fifth `i` element should have a `class` attribute which includes `fa-youtube`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61438b5b66d76a6264430f2a*
