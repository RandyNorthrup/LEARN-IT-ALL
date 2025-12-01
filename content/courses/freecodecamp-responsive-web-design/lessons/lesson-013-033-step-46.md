---
id: lesson-013-033
title: Step 46
chapterId: chapter-13
order: 33
duration: 5
objectives:
  - Step 46
---

# Step 46

You can use radio buttons for questions where you want only one answer out of multiple options.

Here is an example of a radio button with the text set as `cat`:

```html
<input type="radio"> cat
```

Remember that an `input` element is a void element.

Before the text input, add a radio button with the text set as:

`Indoor`

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
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You should create an `input` element for your radio button. Check the syntax.
2. Your `input` element should have an opening tag, but not a closing tag.
3. You should only have added one `input` element for your radio button. Remove any extras.
4. Your new `input` element should be above the existing `input` with `type` attribute set to `text`. You have them in the wrong order.
5. Your new `input` element does not have a `type` attribute. Check that there is a space after the opening tag's name.
6. Your new `input` element should have only one `type` attribute. Remove any extras.
7. Your new `input` element should have a `type` attribute with the value `radio`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.
8. Although you have set the new `input` element's `type` attribute to `radio`, it is recommended to always surround the value of an attribute with quotation marks.
9. The `radio` button's ` Indoor` text should be located after it instead of before it.
10. The text ` Indoor` should be located directly to the right of your `radio` button. You have either omitted the text or have a typo.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804dc*
