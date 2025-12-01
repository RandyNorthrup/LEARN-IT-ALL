---
id: lesson-028-004
title: Make Typography Responsive
chapterId: chapter-28
order: 4
duration: 5
objectives:
  - Make Typography Responsive
---

# Make Typography Responsive

Instead of using `em` or `px` to size text, you can use viewport units for responsive typography. Viewport units, like percentages, are relative units, but they are based off different items. Viewport units are relative to the viewport dimensions (width or height) of a device, and percentages are relative to the size of the parent container element.

The four different viewport units are:

<ul><li><code>vw</code> (viewport width): <code>10vw</code> would be 10% of the viewport's width.</li><li><code>vh</code> (viewport height): <code>3vh</code> would be 3% of the viewport's height.</li><li><code>vmin</code> (viewport minimum): <code>70vmin</code> would be 70% of the viewport's smaller dimension (height or width).</li><li><code>vmax</code> (viewport maximum): <code>100vmax</code> would be 100% of the viewport's bigger dimension (height or width).</li></ul>

Here is an example that sets a `body` tag to 30% of the viewport's width.

```css
body {
  width: 30vw;
}
```

## Instructions

Set the `width` of the `h2` tag to 80% of the viewport's width and the `width` of the paragraph as 75% of the viewport's smaller dimension.

## Starter Code

```html
<style>

</style>

<h2>Importantus Ipsum</h2>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis tempus
  massa. Aenean erat nisl, gravida vel vestibulum cursus, interdum sit amet
  lectus. Sed sit amet quam nibh. Suspendisse quis tincidunt nulla. In hac
  habitasse platea dictumst. Ut sit amet pretium nisl. Vivamus vel mi sem.
  Aenean sit amet consectetur sem. Suspendisse pretium, purus et gravida
  consequat, nunc ligula ultricies diam, at aliquet velit libero a dui.
</p>
```

## Hints

1. Your `h2` tag should have a `width` of 80vw.
2. Your `p` tag should have a `width` of 75vmin.

## Solution

```html
```html
<style>
  h2 {
    width: 80vw;
  }
  p {
    width: 75vmin;
  }
</style>

<h2>Importantus Ipsum</h2>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis tempus
  massa. Aenean erat nisl, gravida vel vestibulum cursus, interdum sit amet
  lectus. Sed sit amet quam nibh. Suspendisse quis tincidunt nulla. In hac
  habitasse platea dictumst. Ut sit amet pretium nisl. Vivamus vel mi sem.
  Aenean sit amet consectetur sem. Suspendisse pretium, purus et gravida
  consequat, nunc ligula ultricies diam, at aliquet velit libero a dui.
</p>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 587d78b1367417b2b2512b0c*
