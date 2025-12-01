---
id: lesson-010-004
title: Step 4
chapterId: chapter-10
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

Within your `.heading` element, create a `header` element with the `class` set to `hero`.

In that element, create an `img` element with the `src` set to `https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png`, the `alt` set to `freecodecamp logo`, and the `class` set to `hero-img`.

The `loading` attribute on an `img` element can be set to `lazy` to tell the browser not to fetch the image resource until it is needed (as in, when the user scrolls the image into view). As an additional benefit, lazy loaded elements will not load until the non-lazy elements are loaded - this means users with slow internet connections can view the content of your page without having to wait for the images to load.

Give your new `img` element a `loading` attribute set to `lazy`.

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

      </section>
    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You should create a `header` element.
2. Your `header` element should be within your `.heading` element.
3. Your `header` element should have the `class` set to `hero`.
4. You should create an `img` element.
5. Your `img` element should be within your `header` element.
6. Your `img` element should have the `src` set to `https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png`.
7. Your `img` element should have the `alt` set to `freecodecamp logo`.
8. Your `img` element should have the `loading` attribute set to `lazy`.
9. Your `img` element should have the `class` set to `hero-img`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143869bb45bd85e3b1926aa*
