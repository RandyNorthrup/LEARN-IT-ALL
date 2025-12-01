---
id: lesson-005-018
title: Step 19
chapterId: chapter-05
order: 18
duration: 5
objectives:
  - Step 19
---

# Step 19

Filling out the content of the quiz, below `#student-info`, add three `div` elements with a `class` of `info`.

Then, within each `div` nest one `label` element, and one `input` element.

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

1. You should nest three `div` elements below the `h2#student-info` element.
2. You should give the first `div` a `class` of `info`.
3. You should give the second `div` a `class` of `info`.
4. You should give the third `div` a `class` of `info`.
5. You should nest one `label` element within the first `div`.
6. You should nest one `input` element within the first `div`, after the `label`.
7. You should nest one `label` element within the second `div`.
8. You should nest one `input` element within the second `div`, after the `label`.
9. You should nest one `label` element within the third `div`.
10. You should nest one `input` element within the third `div`, after the `label`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6143610161323a081b249c19*
