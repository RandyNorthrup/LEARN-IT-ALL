---
id: lesson-038-020
title: Step 21
chapterId: chapter-38
order: 20
duration: 5
objectives:
  - Step 21
---

# Step 21

Keeping in mind best-practices for form inputs, give each `input` an appropriate `type` and `name` attribute. Then, give the first `input` a `placeholder` attribute.

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
            <label for="student-name">Name:</label>
            <input id="student-name" />
          </div>
          <div class="info">
            <label for="student-email">Email:</label>
            <input id="student-email" />
          </div>
          <div class="info">
            <label for="birth-date">Date of Birth:</label>
            <input id="birth-date" />
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

1. You should give the first `input` a `type` of `text`.
2. You should give the second `input` a `type` of `email`.
3. You should give the third `input` a `type` of `date`.
4. You should give the first `input` an appropriate `name` attribute.
5. You should give the second `input` an appropriate `name` attribute.
6. You should give the third `input` an appropriate `name` attribute.
7. You should give the first `input` a `placeholder` attribute.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143908b6aafb00a659ca189*
