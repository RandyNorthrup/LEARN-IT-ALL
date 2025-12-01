---
id: lesson-038-027
title: Step 28
chapterId: chapter-38
order: 27
duration: 5
objectives:
  - Step 28
---

# Step 28

Give each `fieldset` an adequate `name` attribute. Then, give both unordered lists a `class` of `answers-list`.

Finally, use the `legend` to caption the content of the `fieldset` by placing a true/false question as the text content.

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
            <h3><span class="sr-only">Question</span>1</h3>
            <fieldset class="question">
              <legend></legend>
              <ul>
                <li></li>
                <li></li>
              </ul>
            </fieldset>
          </div>
          <div class="question-block">
            <h3><span class="sr-only">Question</span>2</h3>
            <fieldset class="question">
              <legend></legend>
              <ul>
                <li></li>
                <li></li>
              </ul>
            </fieldset>
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

1. You should give the first `fieldset` an adequate `name` attribute. _Hint: I would use `html-question-one`_
2. You should give the second `fieldset` an adequate `name` attribute. _Hint: I would use `html-question-two`_
3. You should give the first `ul` element a `class` of `answers-list`.
4. You should give the second `ul` element a `class` of `answers-list`.
5. You should give the first `legend` element text content.
6. You should give the second `legend` element text content.
7. You should not use the same text content for both `legend` elements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6144e818fd5ea704fe56081d*
