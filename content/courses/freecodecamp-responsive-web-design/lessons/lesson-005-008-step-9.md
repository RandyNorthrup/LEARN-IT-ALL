---
id: lesson-005-008
title: Step 9
chapterId: chapter-05
order: 8
duration: 5
objectives:
  - Step 9
---

# Step 9

As described in the <a href="https://design-style-guide.freecodecamp.org/" target="_blank" rel="noopener noreferrer nofollow">freeCodeCamp Style Guide</a>, the logo should retain an aspect ratio of `35 / 4`, and have padding around the text.

First, change the `background-color` to `#0a0a23` so you can see the logo. Then, use the `aspect-ratio` property to set the desired aspect ratio to `35 / 4`. Finally, add a `padding` of `0.4rem` all around.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="freeCodeCamp Accessibility Quiz practice project" />
    <title>Accessibility Quiz</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <img id="logo" alt="freeCodeCamp" src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg">
      <h1>HTML/CSS Quiz</h1>
      <nav></nav>
    </header>
    <main></main>
  </body>
</html>
```

## Hints

1. You should give `#logo` a `background-color` of `#0a0a23`.
2. You should use the `aspect-ratio` property.
3. You should not use the `height` property.
4. You should not change the `width` property.
5. You should give the `img` an `aspect-ratio` of `35 / 4`.
6. You should give the `img` a `padding` of `0.4rem`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140827cff96e906bd38fc2b*
