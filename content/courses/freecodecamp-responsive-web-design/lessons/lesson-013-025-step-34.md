---
id: lesson-013-025
title: Step 34
chapterId: chapter-13
order: 25
duration: 5
objectives:
  - Step 34
---

# Step 34

The `strong` element is used to indicate that some text is of strong importance or urgent.

In the `figcaption` you just added, indicate that `hate` is of strong importance by wrapping it in a `strong` element.

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
          <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg" alt="Two tabby kittens sleeping together on a couch.">
--fcc-editable-region--
        
          <figcaption>Cats hate other cats.</figcaption>  
        
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `strong` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your `strong` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. Your `strong` element should surround the word `hate` in the text `Cats hate other cats.` You have either omitted the text or have a typo.
4. The `figcaption`'s text should be `Cats hate other cats.` Check for typos and that the necessary spaces are present around the `strong` element's opening and closing tags.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804d4*
