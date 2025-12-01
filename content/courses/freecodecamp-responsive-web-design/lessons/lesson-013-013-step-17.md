---
id: lesson-013-013
title: Step 17
chapterId: chapter-13
order: 13
duration: 5
objectives:
  - Step 17
---

# Step 17

In previous steps you used an anchor element to turn text into a link. Other types of content can also be turned into a link by wrapping it in anchor tags. 

Here is an example of turning an image into a link:

```html
<a href="example-link">
  <img src="image-link.jpg" alt="A photo of a cat.">
</a>
```

Turn the image into a link by surrounding it with necessary element tags. Use `https://freecatphotoapp.com` as the anchor's `href` attribute value.

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <p>Everyone loves <a href="https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg">cute cats</a> online!</p>
      <p>See more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a> in our gallery.</p>
--fcc-editable-region--
      <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. You should have an `img` element with a `src` value of `https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg`. You may have accidentally deleted it.
2. Your anchor (`a`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.
3. You are missing a closing (`a`) tag after the image.
4. Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.
5. You should only add one closing anchor (`a`) tag. Please remove any extras.
6. Your anchor (`a`) element does not have an `href` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
7. Your anchor (`a`) element should link to `https://freecatphotoapp.com`. You have either omitted the URL or have a typo.
8. Your anchor (`a`) element does not have an `href` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
9. Your anchor (`a`) element should link to `https://freecatphotoapp.com`. You have either omitted the URL or have a typo.
10. Your `img` element should be nested within the anchor (`a`) element. The entire `img` element should be inside the opening and closing tags of the anchor (`a`) element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dfa30b9eacea3f48c6300ad*
