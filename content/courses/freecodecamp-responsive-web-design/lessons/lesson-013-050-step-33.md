---
id: lesson-013-050
title: Step 33
chapterId: chapter-13
order: 50
duration: 5
objectives:
  - Step 33
---

# Step 33

After the last `img` element, add a `figcaption` element with the text `Cats hate other cats.`

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
          <figcaption>Cats <em>love</em> lasagna.</figcaption>  
        </figure>
        <h3>Top 3 things cats hate:</h3>
        <ol>
          <li>flea treatment</li>
          <li>thunder</li>
          <li>other cats</li>
        </ol>
--fcc-editable-region--
        <figure>
          <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg" alt="Two tabby kittens sleeping together on a couch.">

        </figure>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `figcaption` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.
2. Your `figcaption` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. There should be a `figure` element right above the second `section` element's closing tag.
4. The last `img` element should be nested in the `figure` element.
5. Your `figure` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.
6. Your `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.
7. The `figcaption` element should be nested in the `figure` element.
8. The `figcaption` element nested in the `figure` element should be below the `img` element. You have the `img` element and the `figcaption` element in the wrong order.
9. The `figcaption` element should have the text `Cats hate other cats.` You have omitted a word or have a typo.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5efae16e3cbd2bbdab94e334*
