---
id: lesson-012-054
title: Step 54
chapterId: chapter-12
order: 54
duration: 5
objectives:
  - Step 54
---

# Step 54

Create and add the following properties to `.bb2a`:

```css
margin: auto;
width: 5vw;
height: 5vw;
border-top: 1vw solid #000;
border-bottom: 1vw solid #000;
border-left: 1vw solid #999;
border-right: 1vw solid #999;
```

After you add these, you can see how a thick border on an element gives you some angles where two sides meet. You are going to use that bottom border as the top of the building.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">    
  <head>
    <meta charset="UTF-8">
    <title>City Skyline</title>
    <link href="styles.css" rel="stylesheet" />
  </head>

  <body>
    <div class="background-buildings">
      <div></div>
      <div></div>
      <div class="bb1">
        <div class="bb1a bb1-window"></div>
        <div class="bb1b bb1-window"></div>
        <div class="bb1c bb1-window"></div>
        <div class="bb1d"></div>
      </div>
      <div class="bb2">
        <div class="bb2a"></div>
        <div class="bb2b"></div>
      </div>
      <div class="bb3"></div>
      <div></div>
      <div class="bb4"></div>
      <div></div>
      <div></div>
    </div>

    <div class="foreground-buildings">
      <div></div>
      <div></div>
      <div class="fb1"></div>
      <div class="fb2"></div>
      <div></div>
      <div class="fb3"></div>
      <div class="fb4"></div>
      <div class="fb5"></div>
      <div class="fb6"></div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>
```

## Hints

1. You should give `.bb2a` a `margin` of `auto`.
2. You should give `.bb2a` a `width` of `5vw`.
3. You should give `.bb2a` a `height` of `5vw`.
4. You should give `.bb2a` a `border-top` of `1vw solid #000`.
5. You should give `.bb2a` a `border-bottom` of `1vw solid #000`.
6. You should give `.bb2a` a `border-left` of `1vw solid #999`.
7. You should give `.bb2a` a `border-right` of `1vw solid #999`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98fe*
