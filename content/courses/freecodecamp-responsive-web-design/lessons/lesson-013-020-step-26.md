---
id: lesson-013-020
title: Step 26
chapterId: chapter-13
order: 20
duration: 5
objectives:
  - Step 26
---

# Step 26

A figure caption (`figcaption`) element is used to add a caption to describe the image contained within the `figure` element. 

Here is an example of a `figcaption` element with the caption of `A cute cat`:

```html
<figure>
  <img src="image.jpg" alt="A description of the image">
  <figcaption>A cute cat</figcaption>
</figure>
```

After the image nested in the `figure` element, add a `figcaption` element with text set to:

`Cats love lasagna.`

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
        <figure>
          <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg" alt="A slice of lasagna on a plate.">
          
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
3. The `figcaption` element should be nested in the `figure` element.
4. The lasagna `img` element should be nested in the `figure` element.
5. The `figcaption` element nested in the `figure` element should be below the `img` element. You have them in the wrong order.
6. Your `figcaption` element's text should be `Cats love lasagna.` You have either omitted the text or have a typo.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dfb6a35eacea3f48c6300b4*
