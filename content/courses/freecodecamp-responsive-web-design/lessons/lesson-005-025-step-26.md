---
id: lesson-005-025
title: Step 26
chapterId: chapter-05
order: 25
duration: 5
objectives:
  - Step 26
---

# Step 26

The `.sr-only` text is still visible. There is a common pattern to visually hide text for only screen readers to read. 

This pattern is to set the following CSS properties:

```css
position: absolute;
width: 1px;
height: 1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
clip-path: inset(50%);
white-space: nowrap;
```

Use the above to define the `.sr-only` CSS rule.

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
            <h3><span class="sr-only">Question</span>1</h3>
            <fieldset class="question"></fieldset>
          </div>
          <div class="question-block">
            <h3><span class="sr-only">Question</span>2</h3>
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

1. You should use the `.sr-only` selector.
2. You should give the `.sr-only` a `position` of `absolute`.
3. You should give the `.sr-only` a `width` of `1px`.
4. You should give the `.sr-only` a `height` of `1px`.
5. You should give the `.sr-only` an `overflow` of `hidden`.
6. You should give the `.sr-only` a `clip` of `rect(0, 0, 0, 0)`.
7. You should give the `.sr-only` a `clip-path` of `inset(50%)`.
8. You should give the `.sr-only` a `white-space` of `nowrap`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614396f7ae83f20ea6f9f4b3*
