---
id: lesson-013-031
title: Step 44
chapterId: chapter-13
order: 31
duration: 5
objectives:
  - Step 44
---

# Step 44

The `button` element is used to create a clickable button.

Add a `button` element with the text `Submit` below the `input` element. The default behavior of clicking a form button without any attributes submits the form to the location specified in the form's `action` attribute.

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
          <figcaption>Cats <strong>hate</strong> other cats.</figcaption>  
        </figure>
      </section>
      <section>
        <h2>Cat Form</h2>
        <form action="https://freecatphotoapp.com/submit-cat-photo">
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          
--fcc-editable-region--
        </form>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `button` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your `button` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. Your `button` element's text should be `Submit`. You have either omitted the text or have a typo.
4. Your `button` element should be below the `input` element. You have them in the wrong order.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804da*
