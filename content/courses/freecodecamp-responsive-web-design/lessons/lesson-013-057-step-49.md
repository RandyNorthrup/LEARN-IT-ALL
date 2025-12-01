---
id: lesson-013-057
title: Step 49
chapterId: chapter-13
order: 57
duration: 5
objectives:
  - Step 49
---

# Step 49

Create another radio button below the first one. Nest it inside a `label` element with `Outdoor` as the `label` text. Give the radio button an `id` attribute with `outdoor` as the value.

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
          <label><input id="indoor" type="radio"> Indoor</label>
          
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

1. Only the original `Indoor` radio button `input` should have an `id` set to `indoor`. You can restart the step to get the original HTML back if needed.
2. You should not make any changes to the `Indoor` radio button. You can restart the step to get the original HTML back if needed.
3. You should add exactly one new `input` element nested in a new `label` element. Make sure your new `label` has both an opening and closing tag.
4. You should not add any attributes to either opening `label` tag.
5. Your new `input` should have an `id` attribute with the value `outdoor`.
6. Your new `input` should have a `type` attribute with the value `radio`.
7. You should not add any new elements other than an `input` nested in a `label`.
8. There should be no text to the left of your new `input`.
9. The label text for your new radio button must be exactly `Outdoor`. This includes capitalization.
10. Your new radio button and label should be immediately below/after the `Indoor` radio button and label. There should be no other tags between them.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f05a1d8e233dff4a68508d8*
