---
id: lesson-037-006
title: HTML Foundations Lesson D
chapterId: chapter-37
order: 6
duration: 5
objectives:
  - HTML Foundations Lesson D
---

# HTML Foundations Lesson D

After you declare the doctype, you need to provide an `<html>` element. This is what’s known as the root element of the document, meaning that every other element in the document will be a descendant of it.

This becomes more important later on when you learn about manipulating HTML with JavaScript. For now, just know that the `html` element should be included on every HTML document.

Back in the `index.html` file, let’s add the `<html>` element by typing out its opening and closing tags, like so:

```html
<!DOCTYPE html>
<html lang="en">
</html>
```

## What is the lang attribute?
`lang` specifies the language of the text content in that element. This attribute is primarily used for improving accessibility of the webpage. It allows assistive technologies, for example screen readers, to adapt according to the language and invoke correct pronunciation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 637f4e2872c65bc8e73dfe21*
