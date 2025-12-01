---
id: lesson-013-019
title: Step 25
chapterId: chapter-13
order: 19
duration: 5
objectives:
  - Step 25
---

# Step 25

The `figure` element represents self-contained content and will allow you to associate an image with a caption.

Nest the image you just added within a `figure` element.

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
--fcc-editable-region--
      
        <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg" alt="A slice of lasagna on a plate.">
      
--fcc-editable-region--
      </section>
    </main>

  </body>
</html>
```

## Hints

1. Your `figure` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.
2. Your `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. There should be an `figure` element right above the second `section` element's closing tag.
4. The lasagna `img` element should be nested in the `figure` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dfb655eeacea3f48c6300b3*
