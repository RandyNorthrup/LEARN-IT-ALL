---
id: lesson-013-008
title: Step 8
chapterId: chapter-13
order: 8
duration: 5
objectives:
  - Step 8
---

# Step 8

HTML <dfn>attributes</dfn> are special words used inside the opening tag of an element to control the element's behavior. The `src` attribute in an `img` element specifies the image's URL (where the image is located).

Here is an example of an `img` element with a `src` attribute pointing to the freeCodeCamp logo:

```html
<img src="https://cdn.freecodecamp.org/platform/universal/fcc_secondary.svg">
```

Inside the existing `img` element, add a `src` attribute with this URL:

`https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg`

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
      <p>Everyone loves cute cats online!</p>
--fcc-editable-region--
      <img>
--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. Your code should have an `img` element. You may have removed the `img` element or you have not surrounded the `src` attribute's value with quotes.
2. Your `img` element should have a `src` attribute. You have either omitted the attribute or have a typo. Make sure there is a space between the element name and the attribute name.
3. Your `img` element's `src` attribute should be set to '`https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg`'. You have either omitted the URL or have a typo. The case of the URL is important.
4. Although you have set the `img` element's `src` to the correct URL, it is recommended to always surround the value of an attribute with quotation marks.
5. Your `img` element should be closed either with `>` or `/>`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dc24073f86c76b9248c6ebb*
