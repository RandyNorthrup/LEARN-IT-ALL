---
id: lesson-038-026
title: Step 27
chapterId: chapter-38
order: 26
duration: 5
objectives:
  - Step 27
---

# Step 27

Each `fieldset` will contain a true/false question.

Within each `fieldset`, nest one `legend` element, and one `ul` element with two options.

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
--fcc-editable-region--
        <section role="region" aria-labelledby="html-questions">
          <h2 id="html-questions">HTML</h2>
          <div class="question-block">
            <h3><span class="sr-only"></span>1</h3>
            <fieldset class="question"></fieldset>
          </div>
          <div class="question-block">
            <h3><span class="sr-only"></span>2</h3>
            <fieldset class="question"></fieldset>
          </div>
        </section>
--fcc-editable-region--
        <section role="region" aria-labelledby="css-questions">
          <h2 id="css-questions">CSS</h2>
        </section>
      </form>
    </main>
  </body>
</html>
```

## Hints

1. You should nest one `legend` element within the first `fieldset` element.
2. You should nest one `ul` element within the first `fieldset` element.
3. You should nest two `li` elements within the first `ul` element.
4. You should nest one `legend` element within the second `fieldset` element.
5. You should nest one `ul` element within the second `fieldset` element.
6. You should nest two `li` elements within the second `ul` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143cb26f7edff2dc28f7da5*
