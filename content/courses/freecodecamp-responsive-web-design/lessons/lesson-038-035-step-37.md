---
id: lesson-038-035
title: Step 37
chapterId: chapter-38
order: 35
duration: 5
objectives:
  - Step 37
---

# Step 37

Within the first `div.answer` element, nest one required `select` element with three `option` elements.

Give the first `option` element a `value` of `""`, and the text `Select an option`. Give the second `option` element a `value` of `yes`, and the text `Yes`. Give the third `option` element a `value` of `no`, and the text `No`.

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
              <ul class="answers-list">
                <li>
                  <label for="q1-a1">
                    <input type="radio" id="q1-a1" name="q1" value="true" />
                    True
                  </label>
                </li>
                <li>
                  <label for="q1-a2">
                    <input type="radio" id="q1-a2" name="q1" value="false" />
                    False
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
                  <label for="q2-a1">
                    <input type="radio" id="q2-a1" name="q2" value="true" />
                    True
                  </label>
                </li>
                <li>
                  <label for="q2-a2">
                    <input type="radio" id="q2-a2" name="q2" value="false" />
                    False
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
        </section>
        <section role="region" aria-labelledby="css-questions">
          <h2 id="css-questions">CSS</h2>
          <div class="formrow">
            <div class="question-block">
              <label>Can the CSS margin property accept negative values?</label>
            </div>
--fcc-editable-region--
            <div class="answer">
              
            </div>
--fcc-editable-region--
            <div class="question-block">
              <label>Do you have any questions:</label>
            </div>
            <div class="answer">
            </div>
          </div>
        </section>
      </form>
    </main>
  </body>
</html>
```

## Hints

1. You should nest one `select` element within the first `div.answer` element.
2. You should nest three `option` elements within the `select` element.
3. You should give the first `option` element a `value` of `""`.
4. You should give the first `option` element a text content of `Select an option`.
5. You should give the second `option` element a `value` of `yes`.
6. You should give the second `option` element a text content of `Yes`.
7. You should give the third `option` element a `value` of `no`.
8. You should give the third `option` element a text content of `No`.
9. You should give the `select` an attribute of `required`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6145f14f019a4b0adb94b051*
