---
id: lesson-034-003
title: CSS Foundations Lesson C
chapterId: chapter-34
order: 3
duration: 5
objectives:
  - CSS Foundations Lesson C
---

# CSS Foundations Lesson C

What if you have two groups of elements that share some of their style declarations?

```css
.read {
  color: white;
  background-color: black;
  /* several unique declarations */
}

.unread {
  color: white;
  background-color: black;
  /* several unique declarations */
}
```

Both our `.read` and `.unread` selectors share the `color: white;` and `background-color: black;` declarations, but otherwise have several of their own unique declarations. To cut down on the repetition, you can group these two selectors together as a comma-separated list:

```css
.read,
.unread {
  color: white;
  background-color: black;
}

.read {
  /* several unique declarations */
}

.unread {
  /* several unique declarations */
}
```

Both of the examples above (with and without grouping) will have the same result, but the second example reduces the repetition of declarations and makes it easier to edit either the `color` or `background-color` for both classes at once.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee352b0d8d4841c3a7091c*
