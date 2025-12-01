---
id: lesson-001-004
title: Jump Straight to the Content Using the main Element
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - Jump Straight to the Content Using the main Element
---

# Jump Straight to the Content Using the main Element

HTML5 introduced several new elements that give developers more options while also incorporating accessibility features. These tags include `main`, `header`, `footer`, `nav`, `article`, and `section`, among others.

By default, a browser renders these elements similar to the humble `div`. However, using them where appropriate gives additional meaning to your markup. The tag name alone can indicate the type of information it contains, which adds semantic meaning to that content. Assistive technologies can access this information to provide better page summary or navigation options to their users.

The `main` element is used to wrap (you guessed it) the main content, and there should be only one per page. It's meant to surround the information related to your page's central topic. It's not meant to include items that repeat across pages, like navigation links or banners.

The `main` tag also has an embedded landmark feature that assistive technology can use to navigate to the main content quickly. If you've ever seen a "Jump to Main Content" link at the top of a page, using the `main` tag automatically gives assistive devices that functionality.

## Instructions

Camper Cat has some big ideas for his ninja weapons page. Help him set up his markup by adding opening and closing `main` tags between the `header` and `footer` (covered in other challenges). Keep the `main` tags empty for now.

## Starter Code

```html
<header>
  <h1>Weapons of the Ninja</h1>
</header>



<footer></footer>
```

## Hints

1. Your code should have one `main` tag.
2. The `main` tags should be between the closing `header` tag and the opening `footer` tag.

## Solution

```html
```html
<header>
  <h1>Weapons of the Ninja</h1>
</header>
<main>

</main>
<footer></footer>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 587d774e367417b2b2512a9f*
