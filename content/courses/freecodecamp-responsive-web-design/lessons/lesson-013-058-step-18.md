---
id: lesson-013-058
title: Step 18
chapterId: chapter-13
order: 58
duration: 5
objectives:
  - Step 18
---

# Step 18

Before adding any new content, you should make use of a `section` element to separate the cat photos content from the future content.

The `section` element is used to define sections in a document, such as chapters, headers, footers, or any other sections of the document. It is a semantic element that helps with SEO and accessibility.

```html
<section>
  <h2>Section Title</h2>
  <p>Section content...</p>
</section>
```

Take your `h2`, `p`, and anchor (`a`) elements and nest them in a `section` element.

## Starter Code

```html
<html>
  <body>
--fcc-editable-region--
    <main>
      <h1>CatPhotoApp</h1>

      <h2>Cat Photos</h2>
      <p>Everyone loves <a href="https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg">cute cats</a> online!</p>
      <p>See more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a> in our gallery.</p>
      <a href="https://freecatphotoapp.com"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>

    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. Your `section` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.
2. Your `section` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. The entire `section` element should be between the opening and closing tags of the `main` element.
4. The existing `h2`, two `p` elements, and anchor (`a`) element should be between the opening and closing tags of the `section` element.
5. The `h1` element should not be nested in the `section` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f07be6ef7412fbad0c5626b*
