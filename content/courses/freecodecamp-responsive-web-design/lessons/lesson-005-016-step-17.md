---
id: lesson-005-016
title: Step 17
chapterId: chapter-05
order: 16
duration: 5
objectives:
  - Step 17
---

# Step 17

Typeface plays an important role in the accessibility of a page. Some fonts are easier to read than others, and this is especially true on low-resolution screens.

Change the font for both the `h1` and `h2` elements to `Verdana`, and use another web-safe font in the sans-serif family as a fallback.

Also, add a `border-bottom` of `4px solid #dfdfe2` to `h2` elements to make the sections distinct.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="freeCodeCamp Accessibility Quiz practice project" />
    <title>Accessibility Quiz</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <img id="logo" alt="freeCodeCamp" src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg">
      <h1>HTML/CSS Quiz</h1>
      <nav>
        <ul>
          <li><a>INFO</a></li>
          <li><a>HTML</a></li>
          <li><a>CSS</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <form method="post" action="https://freecodecamp.org/practice-project/accessibility-quiz">
        <section role="region" aria-labelledby="student-info">
          <h2 id="student-info">Student Info</h2>
        </section>
        <section role="region" aria-labelledby="html-questions">
          <h2 id="html-questions">HTML</h2>
        </section>
        <section role="region" aria-labelledby="css-questions">
          <h2 id="css-questions">CSS</h2>
        </section>
      </form>
    </main>
  </body>
</html>
```

## Hints

1. You should use a multiple element selector to target the `h1` and `h2` elements.
2. You should set the first value of the `font-family` property to `Verdana`.
3. You should set the second value of the `font-family` property to another sans-serif, web safe font. _Hint: I would choose Tahoma_.
4. You should use an `h2` element selector to target the `h2` elements.
5. You should give `h2` a `border-bottom` property of `4px solid #dfdfe2`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614206033d366c090ca7dd42*
