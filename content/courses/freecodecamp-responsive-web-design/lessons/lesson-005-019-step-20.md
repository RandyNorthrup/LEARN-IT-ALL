---
id: lesson-005-019
title: Step 20
chapterId: chapter-05
order: 19
duration: 5
objectives:
  - Step 20
---

# Step 20

It is important to link each `input` to the corresponding `label` element. This provides assistive technology users with a visual reference to the input.

This is done by giving the `label` a `for` attribute, which contains the `id` of the `input`.

This section will take a student's name, email address, and date of birth. Give the `label` elements appropriate `for` attributes, as well as text content. Then, link the `input` elements to the corresponding `label` elements.

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
          <li><a href="#student-info">INFO</a></li>
          <li><a href="#html-questions">HTML</a></li>
          <li><a href="#css-questions">CSS</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <form method="post" action="https://freecodecamp.org/practice-project/accessibility-quiz">
--fcc-editable-region--
        <section role="region" aria-labelledby="student-info">
          <h2 id="student-info">Student Info</h2>
          <div class="info">
            <label></label>
            <input />
          </div>
          <div class="info">
            <label></label>
            <input />
          </div>
          <div class="info">
            <label></label>
            <input />
          </div>
        </section>
--fcc-editable-region--
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

1. You should give the first `label` element an appropriate `for` attribute.
2. You should give the second `label` element an appropriate `for` attribute.
3. You should give the third `label` element an appropriate `for` attribute.
4. You should give the first `label` element an appropriate text content.
5. You should give the second `label` element an appropriate text content.
6. You should give the third `label` element an appropriate text content.
7. You should give the first `input` element an `id` attribute matching the `for` attribute of the first `label`.
8. You should give the second `input` element an `id` attribute matching the `for` attribute of the second `label`.
9. You should give the third `input` element an `id` attribute matching the `for` attribute of the third `label`.
10. You should not use the same `id` attribute for more than one `input` element.
11. You should not use the same `for` attribute for more than one `label` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143639d5eddc7094161648c*
