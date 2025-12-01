---
id: lesson-010-078
title: Step 6
chapterId: chapter-10
order: 78
duration: 5
objectives:
  - Step 6
---

# Step 6

Your image currently takes up a lot of space. To better see what you are working on, add a `width` attribute to the `img` element, with a value of `400`.

You will remove this later on when you have worked on the CSS.

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
--fcc-editable-region--
    <main>
      <section class="heading">
        <header class="hero">
          <img
            src="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"
            alt="freecodecamp logo"
            loading="lazy"
            class="hero-img"
          />
          <h1 class="hero-title">OUR NEW CURRICULUM</h1>
          <p class="hero-subtitle">
            Our efforts to restructure our curriculum with a more project-based
            focus
          </p>
        </header>
      </section>
    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. Your `img` element should have a `width` attribute set to `400`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614e0e588f0e8a772a8a81a6*
