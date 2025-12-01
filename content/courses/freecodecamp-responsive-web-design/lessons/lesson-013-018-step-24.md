---
id: lesson-013-018
title: Step 24
chapterId: chapter-13
order: 18
duration: 5
objectives:
  - Step 24
---

# Step 24

After the unordered list, add a new image with a `src` attribute value set to:

`https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg`

And its `alt` attribute value to:

`A slice of lasagna on a plate.`

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
--fcc-editable-region--
        <ul>
          <li>catnip</li>
          <li>laser pointers</li>
          <li>lasagna</li>
        </ul>
        
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

## Hints

1. There should be an `img` element right after the closing `</ul>` tag.
2. The new image does not have an `alt` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
3. The new image should have an `alt` value of `A slice of lasagna on a plate.` Make sure the `alt` attribute's value is surrounded with quotation marks.
4. The new image does not have a `src` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
5. The new image should have a `src` value of `https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg`. Make sure the `src` attribute's value is surrounded with quotation marks.
6. Although you have set the new image's `src` to the correct URL, it is recommended to always surround the value of an attribute with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dfb6250eacea3f48c6300b2*
