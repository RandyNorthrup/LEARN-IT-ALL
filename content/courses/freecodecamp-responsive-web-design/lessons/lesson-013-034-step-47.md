---
id: lesson-013-034
title: Step 47
chapterId: chapter-13
order: 34
duration: 5
objectives:
  - Step 47
---

# Step 47

`label` elements are used to help associate the text for an `input` element with the `input` element itself (especially for assistive technologies like screen readers). 

Here is an example of a `label` element with a `radio` button:

```html
<label><input type="radio"> cat</label>
```

In the example, clicking on the word `"cat"` will also select the `radio` button.

Nest your `radio` button inside a `label` element.

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
          <input type="radio"> Indoor
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You should make sure the radio button is still present.
2. The text ` Indoor` should be located directly to the right of your `radio` button. Make sure there is a space between the element and the text. You have either omitted the text or have a typo.
3. Your `label` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
4. Your `label` element should have a closing tag. Closing tags have a `/` just after the `<` character.
5. Your radio button and its text should all be located between the opening and closing tags of the `label` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804dd*
