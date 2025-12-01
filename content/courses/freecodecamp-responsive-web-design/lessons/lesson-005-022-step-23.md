---
id: lesson-005-022
title: Step 23
chapterId: chapter-05
order: 22
duration: 5
objectives:
  - Step 23
---

# Step 23

Within the second `section` element, add two `div` elements with a class of `question-block`.

Then, within each `div.question-block` element, add one `h3` element with text of incrementing numbers, starting at `1`, and one `fieldset` element with a class of `question`.

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

1. You should nest two `div` elements within the second `section` element.
2. You should give the first new `div` element a class of `question-block`.
3. You should give the second new `div` element a class of `question-block`.
4. You should nest one `h3` element within each `div.question-block` element.
5. You should give the first `h3` element text of `1`.
6. You should give the second `h3` element text of `2`.
7. You should nest one `fieldset` element within each `div.question-block` element.
8. You should place the first `fieldset` element after the first `h3` element.
9. You should place the second `fieldset` element after the second `h3` element.
10. You should give the first `fieldset` element a class of `question`.
11. You should give the second `fieldset` element a class of `question`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143931a113bb80c45546287*
