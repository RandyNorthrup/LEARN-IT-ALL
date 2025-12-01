---
id: lesson-036-003
title: The Cascade of CSS Lesson C
chapterId: chapter-36
order: 3
duration: 5
objectives:
  - The Cascade of CSS Lesson C
---

# The Cascade of CSS Lesson C

Let’s take a look at a few quick examples to visualize how specificity works. Consider the following HTML and CSS code:

```html
<!-- index.html -->

<div class="main">
  <div class="list subsection"></div>
</div>
```

```css
/* rule 1 */
.subsection {
  color: blue;
}

/* rule 2 */
.main .list {
  color: red;
}
```

In the example above, both rules are using only class selectors, but rule 2 is more specific because it is using more class selectors.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489cb0b82cf2e4f86f03ae3*
