---
id: lesson-013-052
title: Step 45
chapterId: chapter-13
order: 52
duration: 5
objectives:
  - Step 45
---

# Step 45

Even though you added your button below the text input, they appear next to each other on the page. That's because both `input` and `button` elements are <dfn>inline elements</dfn>, which don't appear on new lines.

The button you added will submit the form by default. However, relying on default behavior may cause confusion. Add the `type` attribute with the value `submit` to the `button` to make it clear that it is a submit button.

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
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
--fcc-editable-region--
          <button>Submit</button>
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
3. Your `button` element does not have a `type` attribute. Check that there is a space after the opening tag's name.
4. Your `button` element should have a `type` attribute with the value `submit`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.
5. Although you have set the `button` element's `type` attribute to `submit`, it is recommended to always surround the value of an attribute with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5efb2c990dc218d6c85f89b2*
