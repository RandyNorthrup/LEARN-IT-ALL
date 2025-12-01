---
id: lesson-028-002
title: Make an Image Responsive
chapterId: chapter-28
order: 2
duration: 5
objectives:
  - Make an Image Responsive
---

# Make an Image Responsive

Making images responsive with CSS is actually very simple. You just need to add these properties to an image:

```css
img {
  max-width: 100%;
  height: auto;
}
```

The `max-width` of `100%` will make sure the image is never wider than the container it is in, and the `height` of `auto` will make the image keep its original aspect ratio.

## Instructions

Add the style rules to the `responsive-img` class to make it responsive. It should never be wider than its container (in this case, it's the preview window) and it should keep its original aspect ratio. After you have added your code, resize the preview to see how your images behave.

## Starter Code

```html
<style>
.responsive-img {


}

img {
  width: 600px;
}
</style>

<img
  class="responsive-img"
  src="https://cdn.freecodecamp.org/curriculum/responsive-web-design-principles/FCCStickerPack.jpg"
  alt="freeCodeCamp stickers set"
/>
<img
  src="https://cdn.freecodecamp.org/curriculum/responsive-web-design-principles/FCCStickerPack.jpg"
  alt="freeCodeCamp stickers set"
/>
```

## Hints

1. Your `responsive-img` class should have a `max-width` set to `100%`.
2. Your `responsive-img` class should have a `height` set to `auto`.

## Solution

```html
```html
<style>
  .responsive-img {
    max-width: 100%;
    height: auto;
  }

  img {
    width: 600px;
  }
</style>

<img
  class="responsive-img"
  src="https://cdn.freecodecamp.org/curriculum/responsive-web-design-principles/FCCStickerPack.jpg"
  alt="freeCodeCamp stickers set"
/>
<img
  src="https://cdn.freecodecamp.org/curriculum/responsive-web-design-principles/FCCStickerPack.jpg"
  alt="freeCodeCamp stickers set"
/>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 587d78b1367417b2b2512b09*
