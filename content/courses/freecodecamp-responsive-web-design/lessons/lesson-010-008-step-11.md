---
id: lesson-010-008
title: Step 11
chapterId: chapter-10
order: 8
duration: 5
objectives:
  - Step 11
---

# Step 11

Below your `.heading` element, create a new `section` element with the `class` set to `text`. Within that, create a `p` element with the `class` set to `first-paragraph` and the following text:

```markup
Soon the freeCodeCamp curriculum will be 100% project-driven learning. Instead of a series of coding challenges, you'll learn through building projects - step by step. Before we get into the details, let me emphasize: we are not changing the certifications. All 6 certifications will still have the same 5 required projects. We are only changing the optional coding challenges.
```

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
        <div class="social-icons">
          <a href="https://www.facebook.com/freecodecamp/">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/freecodecamp/">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/freecodecamp">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/school/free-code-camp/">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.youtube.com/freecodecamp">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </section>
--fcc-editable-region--

--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. You should create a new `section` element.
2. Your new `section` element should come after your `.heading` element.
3. Your new `section` element should have the `class` set to `text`.
4. You should create a new `p` element within your `.text` element.
5. Your new `p` element should have the `class` set to `first-paragraph`.
6. Your new `p` element should have the provided text.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61438ec09438696391076d6a*
