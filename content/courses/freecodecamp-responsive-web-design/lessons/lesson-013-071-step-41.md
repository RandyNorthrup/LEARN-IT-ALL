---
id: lesson-013-071
title: Step 41
chapterId: chapter-13
order: 71
duration: 5
objectives:
  - Step 41
---

# Step 41

In order for a form's data to be accessed by the location specified in the `action` attribute, you must give the text field a `name` attribute and assign it a value to represent the data being submitted. 

Here is an example of an `input` element with a `name` attribute:

```html
<input type="text" name="name">
```

Add the `name` attribute with the value `catphotourl` to your text field.

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
          <input type="text">
--fcc-editable-region--
        </form>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You have either deleted your `input` element or it has invalid syntax. All attributes' values should be surrounded by quotation marks.
2. Your `form` should only contain the `input` element. Remove any additional HTML elements or text within the `form` element.
3. Your `input` element does not have a `name` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
4. Your `input` element should have a `name` attribute with the value `catphotourl`.  You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.
5. Although you have set the `input` element's `name` attribute to `catphotourl`, it is recommended to always surround the value of an attribute with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 7cf9b03d81a65668421804c3*
