---
id: lesson-005-013
title: Step 14
chapterId: chapter-05
order: 13
duration: 5
objectives:
  - Step 14
---

# Step 14

As this is a quiz, you will need a form for users to submit answers. You can semantically separate the content within the form using `section` elements.

Within the `main` element, create a form with three nested `section` elements. Then, make the form submit to `https://freecodecamp.org/practice-project/accessibility-quiz`, using the correct method.

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
          <li><a>INFO</a></li>
          <li><a>HTML</a></li>
          <li><a>CSS</a></li>
        </ul>
      </nav>
    </header>
--fcc-editable-region--
    <main>

    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You should nest a `form` element within your `main` element.
2. You should nest three `section` elements within your `form` element.
3. You should give the `form` element an `action` attribute.
4. You should give the `action` attribute a value of `https://freecodecamp.org/practice-project/accessibility-quiz`.
5. You should give the `form` element a `method` attribute.
6. You should give the `form` element a `method` attribute with a value of `post`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6141fabd6f75610664e908fd*
