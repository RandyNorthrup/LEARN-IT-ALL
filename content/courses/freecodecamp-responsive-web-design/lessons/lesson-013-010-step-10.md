---
id: lesson-013-010
title: Step 10
chapterId: chapter-13
order: 10
duration: 5
objectives:
  - Step 10
---

# Step 10

You can link to another page with the anchor (`a`) element. 

Here is an example linking to `https://www.freecodecamp.org`:

```html
<a href="https://www.freecodecamp.org"></a>
```

Add an anchor element after the paragraph that links to `https://freecatphotoapp.com`. At this point, the link won’t show up in the preview.

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
--fcc-editable-region--
      <p>Everyone loves cute cats online!</p>
      
--fcc-editable-region--
      <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
    </main>
  </body>
</html>
```

## Hints

1. Your anchor (`a`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.
2. Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.
3. Your anchor (`a`) element should be below the `p` element. You have them in the wrong order.
4. Your anchor (`a`) element does not have an `href` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
5. Your anchor (`a`) element should link to `https://freecatphotoapp.com`. You have either omitted the URL or have a typo.
6. Although you have set the anchor (`a`) element's `href` attribute to the correct link, it is recommended to always surround the value of an attribute with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dc24614f86c76b9248c6ebd*
