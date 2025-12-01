---
id: lesson-034-001
title: CSS Foundations Lesson A
chapterId: chapter-34
order: 1
duration: 5
objectives:
  - CSS Foundations Lesson A
---

# CSS Foundations Lesson A

A type selector (or element selector) will select all elements of the given element type, and the syntax is just the name of the element:

```html
<!-- index.html -->

<div>Hello, World!</div>
<div>Hello again!</div>
<p>Hi...</p>
<div>Okay, bye.</div>
```

```css
/* styles.css */

div {
  color: white;
}
```

Here, all three `<div>` elements would be selected, while the `<p>` element wouldn’t be.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee351d0d8d4841c3a7091a*
