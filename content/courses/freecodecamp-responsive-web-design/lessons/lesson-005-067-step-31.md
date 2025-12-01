---
id: lesson-005-067
title: Step 31
chapterId: chapter-05
order: 67
duration: 5
objectives:
  - Step 31
---

# Step 31

Although not required for `label` elements with a nested `input`, it is still best-practice to explicitly link a `label` with its corresponding `input` element.

Now, add a `for` attribute to each of your four `label`s that links the `label` to its corresponding radio `input`.

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
            <fieldset class="question" name="html-question-one">
              <legend>
                The legend element represents a caption for the content of its
                parent fieldset element
              </legend>
--fcc-editable-region--
              <ul class="answers-list">
                <li>
                  <label>
                    <input type="radio" id="q1-a1"/>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" id="q1-a2" />
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
          <div class="question-block">
            <h3><span class="sr-only">Question</span>2</h3>
            <fieldset class="question" name="html-question-two">
              <legend>
                A label element nesting an input element is required to have a
                for attribute with the same value as the input's id
              </legend>
              <ul class="answers-list">
                <li>
                  <label>
                    <input type="radio" id="q2-a1" />
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" id="q2-a2" />
                  </label>
                </li>
              </ul>
--fcc-editable-region--
            </fieldset>
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

1. You should give the first `label` a `for` attribute.
2. You should give the first `label` a `for` attribute matching the `id` of its `input` element.
3. You should give the second `label` a `for` attribute.
4. You should give the second `label` a `for` attribute matching the `id` of its `input` element.
5. You should give the third `label` a `for` attribute.
6. You should give the third `label` a `for` attribute matching the `id` of its `input` element.
7. You should give the fourth `label` a `for` attribute.
8. You should give the fourth `label` a `for` attribute matching the `id` of its `input` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6351e7a8684bf5377c4ee7f7*
