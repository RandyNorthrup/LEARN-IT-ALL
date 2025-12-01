---
id: lesson-005-052
title: Step 54
chapterId: chapter-05
order: 52
duration: 5
objectives:
  - Step 54
---

# Step 54

Give the `.formrow` elements top margin, and left and right padding. The other padding values should be `0`.

Then, increase the font size for all `input` elements.

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
              <label for="selector">Can the CSS margin property accept negative values?</label>
            </div>
            <div class="answer">
              <select name="selector" id="selector" required>
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div class="question-block">
              <label for="css-textarea">Do you have any questions:</label>
            </div>
            <div class="answer">
              <textarea id="css-textarea" name="css-questions" rows="5" cols="24"></textarea>
            </div>
          </div>
        </section>
        <button type="submit">Send</button>
      </form>
    </main>
    <footer>
      <address>
        <a href="https://freecodecamp.org">freeCodeCamp</a><br />
        San Francisco<br />
        California<br />
        USA
      </address>
    </footer>
  </body>
</html>
```

## Hints

1. You should use a `.formrow` selector to target the `.formrow` elements.
2. You should give the `.formrow` a `margin-top` of at least `1px`.
3. You should give the `.formrow` a `padding-top` of `0`.
4. You should give the `.formrow` a `padding-right` of at least `1px`.
5. You should give the `.formrow` a `padding-bottom` of `0`.
6. You should give the `.formrow` a `padding-left` of at least `1px`.
7. You should use an `input` selector to target the `input` elements.
8. You should give the `input` a `font-size` greater than `13px`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614884c1f5d6f30ab3d78cde*
