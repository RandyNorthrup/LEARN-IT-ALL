---
id: lesson-005-012
title: Step 13
chapterId: chapter-05
order: 12
duration: 5
objectives:
  - Step 13
---

# Step 13

The child combinator selector `>` is used between selectors to target only elements that match the second selector and are a direct child of the first selector.

This can be helpful when you have deeply nested elements and want to control the scope of your styling.

Use the `>` selector to target the unordered list elements within the `nav` elements, and use _Flexbox_ to evenly space the children.

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
    <main></main>
  </body>
</html>
```

## Hints

1. You should use the `nav > ul` selector.
2. You should give the `nav > ul` elements a `display` of `flex`.
3. You should give the `nav > ul` elements a `justify-content` of `space-evenly`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614090d5a22b6f0a5a6b464c*
