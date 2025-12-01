---
id: lesson-013-006
title: Step 6
chapterId: chapter-13
order: 6
duration: 5
objectives:
  - Step 6
---

# Step 6

In the previous step, you put the `h1`, `h2`, comment, and `p` elements inside the `main` element. This is called *nesting*. Nested elements should be placed two spaces further to the right of the element they are nested in. This spacing is called indentation and it is used to make HTML easier to read.

Here is an example of nesting and indentation:

```html
<main>
  <h1>Most important content of the document</h1>
  <p>Some more important content...</p>
</main>
```

The `h1` element, `h2` element and the comment are indented two spaces more than the `main` element in the code below. Use the space bar on your keyboard to add two more spaces in front of the `p` element so that it is indented properly as well.

## Starter Code

```html
<html>
  <body>
--fcc-editable-region--
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
    <p>Everyone loves cute cats online!</p>
    </main>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. Your code should have an `h2` element with text `Cat Photos`. You may have accidentally deleted it, it is missing both opening and closing tags, or the text has changed.
2. You should not add the `ul` or `li` elements from the example.
3. You should not change the indentation on the line with your `h2` element. Its opening tag should start 6 spaces over from the start of the line. You can restart the step to restore the original indentation.
4. Your code should have a comment. You removed the comment from an earlier step.
5. The comment's text should be `TODO: Add link to cat photos`. Do not change the text or spacing of the comment.
6. You should not change the indentation on the line with your comment element. Its opening tag should start 6 spaces over from the start of the line. You can restart the step to restore the original indentation.
7. Your code should have a `p` element. You have removed the `p` element from an earlier step.
8. The text of the `p` element should be `Everyone loves cute cats online!` Do not change the text, spacing, or punctuation of the `p` element.
9. The opening `p` tag should have indentation that matches your `h2` and comment elements. Its opening tag should start 6 spaces over from the start of the line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dc23991f86c76b9248c6eb8*
