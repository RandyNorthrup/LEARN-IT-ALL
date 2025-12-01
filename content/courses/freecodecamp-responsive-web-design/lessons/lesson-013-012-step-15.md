---
id: lesson-013-012
title: Step 15
chapterId: chapter-13
order: 12
duration: 5
objectives:
  - Step 15
---

# Step 15

To open links in a new tab, you can use the `target` attribute on the anchor (`a`) element. 

The `target` attribute specifies where to open the linked document. `target="_blank"` opens the linked document in a new tab or window.

Here is the basic syntax for an `a` element with a `target` attribute:

```html
<a href="https://www.freecodecamp.org" target="_blank">freeCodeCamp</a>
```

Add a `target` attribute with the value `_blank` to the anchor (`a`) element's opening tag, so that the link opens in a new tab.

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
      <p>Everyone loves <a href="https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg">cute cats</a> online!</p>
--fcc-editable-region--
      <p>See more <a href="https://freecatphotoapp.com">cat photos</a> in our gallery.</p>
--fcc-editable-region--
      <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
    </main>
  </body>
</html>
```

## Hints

1. Your `p` element should have a nested anchor (`a`) element with the text `cat photos`. You may have deleted it or have a typo.
2. Your anchor (`a`) element does not have a `target` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
3. The value of the `target` attribute should be `_blank`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dfa2407b521be39a3de7be1*
