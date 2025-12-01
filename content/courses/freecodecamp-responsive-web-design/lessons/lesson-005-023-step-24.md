---
id: lesson-005-023
title: Step 24
chapterId: chapter-05
order: 23
duration: 5
objectives:
  - Step 24
---

# Step 24

The question numbers are not descriptive enough. This is especially true for visually impaired users. One way to get around such an issue, without having to add visible text to the element, is to add text only a screen reader can read.

Nest a `span` element with a `class` of `sr-only` after the number in each of the `h3` elements.

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
        <section role="region" aria-labelledby="student-info">
          <h2 id="student-info">Student Info</h2>
          <div class="info">
            <label for="student-name">Name:</label>
            <input type="text" name="student-name" id="student-name" />
          </div>
          <div class="info">
            <label for="student-email">Email:</label>
            <input type="email" name="student-email" id="student-email" />
          </div>
          <div class="info">
            <label for="birth-date">Date of Birth:</label>
            <input type="date" name="birth-date" id="birth-date" />
          </div>
        </section>
        <section role="region" aria-labelledby="html-questions">
          <h2 id="html-questions">HTML</h2>
          <div class="question-block">
--fcc-editable-region--
            <h3>1</h3>
            <fieldset class="question"></fieldset>
          </div>
          <div class="question-block">
            <h3>2</h3>
--fcc-editable-region--
            <fieldset class="question"></fieldset>
          </div>
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

1. You should add a `span` element within the first `h3` element.
2. You should give the first `span` element a `class` of `sr-only`.
3. You should add a `span` element within the second `h3` element.
4. You should give the second `span` element a `class` of `sr-only`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614394fb41985e0d2012a93e*
