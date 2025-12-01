---
id: lesson-013-021
title: Step 27
chapterId: chapter-13
order: 21
duration: 5
objectives:
  - Step 27
---

# Step 27

To place emphasis on a specific word or phrase, you can use the `em` element. 

Emphasize the word `love` in the `figcaption` element by wrapping it in an emphasis `em` element.

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <section>
        <h2>Cat Photos</h2>
        <p>Everyone loves <a href="https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg">cute cats</a> online!</p>
        <p>See more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a> in our gallery.</p>
        <a href="https://freecatphotoapp.com"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
      </section>
      <section>
        <h2>Cat Lists</h2>
        <h3>Things cats love:</h3>
        <ul>
          <li>catnip</li>
          <li>laser pointers</li>
          <li>lasagna</li>
        </ul>
        <figure>
          <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg" alt="A slice of lasagna on a plate.">
--fcc-editable-region--
          <figcaption>Cats love lasagna.</figcaption>
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your emphasis `em` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your emphasis `em` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. You have either deleted the `figcaption` element or it is missing an opening or closing tag.
4. Your emphasis `em` element should surround the text `love`. You have either omitted the text or have a typo.
5. The `figcaption`'s text should be `Cats love lasagna`. Check for typos and that the necessary spaces are present around the `em` element's opening and closing tags.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804d0*
