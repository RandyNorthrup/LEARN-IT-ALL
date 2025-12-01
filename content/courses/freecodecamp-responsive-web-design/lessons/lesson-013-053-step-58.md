---
id: lesson-013-053
title: Step 58
chapterId: chapter-13
order: 53
duration: 5
objectives:
  - Step 58
---

# Step 58

There's another way to associate an `input` element's text with the element itself. You can nest the text within a `label` element and add a `for` attribute with the same value as the `input` element's `id` attribute.

Given an `input` element as below:

```html
<input id="breakfast" type="radio" name="meal" value="breakfast">
```

An example of a `label` element that is associated to this `input` element is:

```html
<label for="breakfast">Breakfast</label>
```

Associate the text `Loving` with the checkbox by nesting only the text `Loving` in a `label` element and giving it an appropriate `for` attribute.

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
          <fieldset>
            <legend>Is your cat an indoor or outdoor cat?</legend>
            <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
            <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
          </fieldset>
          <fieldset>
            <legend>What's your cat's personality?</legend>
--fcc-editable-region--
            <input id="loving" type="checkbox"> Loving
--fcc-editable-region--
          </fieldset>
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You should make sure the checkbox element is still present, and you did not make any changes to it. It should stay as it was in the starting code.
2. Your checkbox should still have an `id` attribute with the value `loving`.  Expected `--fcc-expected--`, but found `--fcc-actual--`.
3. You should add a new `label` element after the checkbox element. Make sure it has both an opening and closing tag.
4. Your `label` element should be located after your checkbox.
5. Your `label` element should have the text `Loving`.
6. assert.strictEqual(checkboxSiblingElementText, 'Loving');
7. The label text `Loving` should only be inside your new `label` element. Make sure you did not duplicate the text outside the `label` element.
8. assert.notInclude(checkboxSiblingNode, 'Loving');
assert.notInclude(labelSiblingNode, 'Loving');
9. Your `label` element does not have a `for` attribute. Make sure there is a space between the opening `label` tag name and the `for` attribute.
10. assert.isNotNull(checkboxSiblingElementAttr);
11. Your `label` element should have a `for` attribute with the value `loving`.  Expected `--fcc-expected--`, but found `--fcc-actual--`.
12. assert.strictEqual(checkboxSiblingElementAttr, 'loving');
13. There should be a space between your checkbox and your new `label` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5efc4f528d6a74d05e68af74*
