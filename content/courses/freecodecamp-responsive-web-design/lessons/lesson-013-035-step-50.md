---
id: lesson-013-035
title: Step 50
chapterId: chapter-13
order: 35
duration: 5
objectives:
  - Step 50
---

# Step 50

Notice that both radio buttons can be selected at the same time. To make it so selecting one radio button automatically deselects the other, both buttons must have a `name` attribute with the same value.

Here is an example of two radio buttons with the same `name` attribute:

```html
<input type="radio" name="meal"> Breakfast
<input type="radio" name="meal"> Lunch
```

Add the `name` attribute with the value `indoor-outdoor` to both radio buttons.

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
          <label><input id="outdoor" type="radio"> Outdoor</label>
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

1. Both radio buttons should still be located between opening and closing `label` element tags.
2. Both radio buttons should have a `name` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
3. Both radio buttons should have a `type` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
4. Both radio buttons should have a `name` attribute with the value `indoor-outdoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804de*
