---
id: lesson-019-008
title: Split Your Styles into Smaller Chunks with Partials
chapterId: chapter-19
order: 8
duration: 5
objectives:
  - Split Your Styles into Smaller Chunks with Partials
---

# Split Your Styles into Smaller Chunks with Partials

<dfn>Partials</dfn> in Sass are separate files that hold segments of CSS code. These are imported and used in other Sass files. This is a great way to group similar code into a module to keep it organized.

Names for partials start with the underscore (`_`) character, which tells Sass it is a small segment of CSS and not to convert it into a CSS file. Also, Sass files end with the `.scss` file extension. To bring the code in the partial into another Sass file, use the `@import` directive.

For example, if all your mixins are saved in a partial named "\_mixins.scss", and they are needed in the "main.scss" file, this is how to use them in the main file:

```scss
@import 'mixins'
```

Note that the underscore and file extension are not needed in the `import` statement - Sass understands it is a partial. Once a partial is imported into a file, all variables, mixins, and other code are available to use.

## Instructions

Write an `@import` statement to import a partial named `_variables.scss` into the main.scss file.

## Starter Code

```html
<!-- The main.scss file -->
```

## Hints

1. Your code should use the `@import` directive, and should not include the underscore in the file name.

## Solution

```html
```html
@import 'variables'
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 587d7dbf367417b2b2512bbc*
