---
id: lesson-036-005
title: The Cascade of CSS Lesson E
chapterId: chapter-36
order: 5
duration: 5
objectives:
  - The Cascade of CSS Lesson E
---

# The Cascade of CSS Lesson E

```css
/* rule 1 */
#subsection .list {
  background-color: yellow;
  color: blue;
}

/* rule 2 */
#subsection .main .list {
  color: red;
}
```

In this final example, both rules are using ID and class selectors, so neither rule is using a more specific selector than the other. The cascade then checks the amounts of each selector type. Both rules only have one ID selector, but rule 2 has more class selectors, so rule 2 has a higher specificity!

While the `color: red` declaration would take precedence, the `background-color: yellow` declaration would still be applied since there’s no conflicting declaration for it.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489cf6282cf2e4f86f03ae6*
