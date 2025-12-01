---
id: lesson-005-014
title: Step 15
chapterId: chapter-05
order: 14
duration: 5
objectives:
  - Step 15
---

# Step 15

To increase the page accessibility, the `role` attribute can be used to indicate the purpose behind an element on the page to assistive technologies. The `role` attribute is a part of the _Web Accessibility Initiative_ (WAI), and accepts preset values.

Give each of the `section` elements the `region` role.

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
        <section></section>
        <section></section>
        <section></section>
      </form>
--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. You should give the first `section` element the `region` role.
2. You should give the second `section` element the `region` role.
3. You should give the third `section` element the `region` role.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6141fed65b61320743da5894*
