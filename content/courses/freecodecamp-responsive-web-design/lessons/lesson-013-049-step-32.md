---
id: lesson-013-049
title: Step 32
chapterId: chapter-13
order: 49
duration: 5
objectives:
  - Step 32
---

# Step 32

To improve accessibility of the image you added, add an `alt` attribute with the text:

`Two tabby kittens sleeping together on a couch.`

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
        <figure>
--fcc-editable-region--
          <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg">
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `figure` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. There should be a `figure` element right above the last `section` element's closing tag.
4. The Cats `img` element should be nested in the `figure` element.
5. The third image should have a `src` attribute set to `https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg`.
6. The Cats `img` element should have an `alt` attribute with the value `Two tabby kittens sleeping together on a couch.`

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5efae0543cbd2bbdab94e333*
