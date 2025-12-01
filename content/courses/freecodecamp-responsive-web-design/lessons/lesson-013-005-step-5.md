---
id: lesson-013-005
title: Step 5
chapterId: chapter-13
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

HTML5 has some elements that identify different content areas. These elements make your HTML easier to read and help with Search Engine Optimization (SEO) and accessibility.

The `main` element is used to represent the main content of the body of an HTML document. Content inside the `main` element should be unique to the document and should not be repeated in other parts of the document.

```html
<main>
  <h1>Most important content of the document</h1>
  <p>Some more important content...</p>
</main>
```

Identify the main section of this page by adding a `<main>` opening tag before the `h1` element, and a `</main>` closing tag after the `p` element.

## Starter Code

```html
<html>
  <body>
--fcc-editable-region--
  
    <h1>CatPhotoApp</h1>
    <h2>Cat Photos</h2>
    <!-- TODO: Add link to cat photos -->
    <p>Everyone loves cute cats online!</p>
    
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. Your `main` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your `main` tags should be in lowercase. By convention, all HTML tags are written in lowercase.
3. Your `main` element should have a closing tag. Closing tags have a `/` just after the `<` character.
4. Your `main` element's opening tag should be below the `body` element's opening tag. You have them in the wrong order.
5. Your `main` element's opening tag should be above the `h1` element. You have them in the wrong order.
6. Your `main` element's closing tag should be below the `p` element. You have them in the wrong order.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dc2385ff86c76b9248c6eb7*
