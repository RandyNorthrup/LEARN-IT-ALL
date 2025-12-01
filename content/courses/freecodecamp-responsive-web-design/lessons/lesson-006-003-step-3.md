---
id: lesson-006-003
title: Step 3
chapterId: chapter-06
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

The `title` is one of several elements that provide extra information not visible on the web page, but it is useful for search engines or how the page gets displayed.

Inside the `head` element, nest a `meta` element with an attribute named `charset` set to the value `utf-8` to tell the browser how to encode characters for the page.

Remember that `meta` elements are void elements that require no ending tag.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <title>Cafe Menu</title>
  </head>
--fcc-editable-region--
</html>
```

## Hints

1. You should have a `meta` tag.
2. The `meta` element is a void element, it should not have an end tag `</meta>`.
3. Your `meta` tag should have a `charset` attribute.
4. Your `charset` attribute should have a value of `utf-8`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f331e55dfab7a896e53c3a1*
