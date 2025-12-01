---
id: lesson-036-004
title: The Cascade of CSS Lesson D
chapterId: chapter-36
order: 4
duration: 5
objectives:
  - The Cascade of CSS Lesson D
---

# The Cascade of CSS Lesson D

Now, let’s change things a little bit:

```html
<!-- index.html -->

<div class="main">
  <div class="list" id="subsection"></div>
</div>
```

```css
/* rule 1 */
#subsection {
  color: blue;
}

/* rule 2 */
.main .list {
  color: red;
}
```

In the example above, despite rule 2 having more class selectors than ID selectors, rule 1 is more specific because ID beats class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489cf5882cf2e4f86f03ae5*
