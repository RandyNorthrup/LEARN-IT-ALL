---
id: lesson-013-028
title: Step 38
chapterId: chapter-13
order: 28
duration: 5
objectives:
  - Step 38
---

# Step 38

The `action` attribute indicates where form data should be sent. 

Here is an example of a `form` element with an `action` attribute:

```html
<form action="/submit-url"></form>
```

In the example, `action="/submit-url"` tells the browser that the form data should be sent to the path `/submit-url`.

Add an `action` attribute with the value `https://freecatphotoapp.com/submit-cat-photo` to the `form` element.

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
--fcc-editable-region--
        <form>
        </form>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `form` element should have an opening tag and closing tag in the correct order. You may be missing one or both of the required tags, or have them in the wrong order.
2. Your `form` element nested in the last `section` element should be below the `h2` element. You have the `h2` element and the `form` element in the wrong order.
3. Your `form` element should have no content. Remove any HTML elements or text between the `form` element's tags.
4. Your `form` element does not have an `action` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
5. Your `form` element should have an `action` attribute with the value `https://freecatphotoapp.com/submit-cat-photo`.
6. Although you have set the `action` attribute to the correct URL, it is recommended to always surround the value of an attribute with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804d7*
