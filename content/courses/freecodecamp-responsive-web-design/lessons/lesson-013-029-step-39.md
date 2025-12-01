---
id: lesson-013-029
title: Step 39
chapterId: chapter-13
order: 29
duration: 5
objectives:
  - Step 39
---

# Step 39

The `input` element allows you several ways to collect data from a web form. Like `img` elements, `input` elements are a <dfn>void element</dfn> and do not need closing tags.

Nest an `input` element in the `form` element.

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
        <form action="https://freecatphotoapp.com/submit-cat-photo">
          
        </form>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `form` element should have an opening tag and closing tag in the correct order. You may be missing one or both of the required tags, or have them in the wrong order.
2. Your `form` element's opening tag should only have an `action` attribute. Remove anything else you may have typed in it.
3. You should create an `input` element. Check the syntax.
4. Your `input` element should have an opening tag, but not a closing tag.
5. Your `input` element should be nested within the `form` element.
6. Your `form` should only contain the `input` element. Remove any HTML elements or text between the `form` element's tags.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804d8*
