---
id: lesson-038-015
title: Step 16
chapterId: chapter-38
order: 15
duration: 5
objectives:
  - Step 16
---

# Step 16

Every `region` role requires a label, which helps screen reader users understand the purpose of the region. One method for adding a label is to add a heading element inside the region and then reference it with the `aria-labelledby` attribute.

Add the following `aria-labelledby` attributes to the `section` elements:

- `student-info`
- `html-questions`
- `css-questions`

Then, within each `section` element, nest one `h2` element with an `id` matching the corresponding `aria-labelledby` attribute. Give each `h2` suitable text content.

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
    <main>
--fcc-editable-region--
      <form method="post" action="https://freecodecamp.org/practice-project/accessibility-quiz">
        <section role="region"></section>
        <section role="region"></section>
        <section role="region"></section>
      </form>
--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. You should give the first `section` element an `aria-labelledby` attribute of `student-info`.
2. You should give the second `section` element an `aria-labelledby` attribute of `html-questions`.
3. You should give the third `section` element an `aria-labelledby` attribute of `css-questions`.
4. You should nest one `h2` element within the first `section` element.
5. You should nest one `h2` element within the second `section` element.
6. You should nest one `h2` element within the third `section` element.
7. You should give the first `h2` element an `id` attribute of `student-info`.
8. You should give the second `h2` element an `id` attribute of `html-questions`.
9. You should give the third `h2` element an `id` attribute of `css-questions`.
10. You should give the first `h2` element suitable text content. _Hint: I would have chosen `Student Info`_
11. You should give the second `h2` element suitable text content. _Hint: I would have chosen `HTML`_
12. You should give the third `h2` element suitable text content. _Hint: I would have chosen `CSS`_

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614202874ca576084fca625f*
