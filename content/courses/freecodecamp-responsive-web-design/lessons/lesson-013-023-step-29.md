---
id: lesson-013-023
title: Step 29
chapterId: chapter-13
order: 23
duration: 5
objectives:
  - Step 29
---

# Step 29

The code for an ordered list (`ol`) is similar to an unordered list, but list items in an ordered list are numbered when displayed.

Below the `h3` element, add an ordered list with these three list items:

`flea treatment`
`thunder`
`other cats`

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
--fcc-editable-region--
        <h3>Top 3 things cats hate:</h3>
        
--fcc-editable-region--
      </section>
    </main>

  </body>
</html>
```

## Hints

1. Your `ol` element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your `ol` element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. The `ol` element should be above the second `section` element's closing tag. You have them in the wrong order.
4. The three `li` elements should be nested inside the `ol` element.
5. You should have three `li` elements with the text `flea treatment`, `thunder` and `other cats` in any order.
6. You should only have one `ol` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5ef9b03c81a63668521804d2*
