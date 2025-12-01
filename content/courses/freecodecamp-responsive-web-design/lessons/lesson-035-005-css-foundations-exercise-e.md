---
id: lesson-035-005
title: CSS Foundations Exercise E
chapterId: chapter-35
order: 5
duration: 5
objectives:
  - CSS Foundations Exercise E
---

# CSS Foundations Exercise E

Understanding how combinators work can become a lot easier when you start playing around with them and see what exactly is affected by them versus what isn't.

The goal of this exercise is to apply styles to elements that are descendants of another element, while leaving elements that aren't descendants of that element unstyled.

1. You should see a `yellow` background for `p` elements that are descendants of the `div` element.
1. You should see a text color of `red` for elements that are descendants of the `div` element.
1. You should see a font size of `20px` for elements that are descendants of the `div` element.
1. You should center align text for elements that are descendants of the `div` element.

## Starter Code

```html
```
```

## Hints

1. You should have a background color of `yellow` on your descendants.
2. const styles = [styleOne, styleTwo, styleThree, styleFour];
3. function getCorrectStyle(){
    for(let i = 0; i < styles.length; i++){
        if(styles[i] != undefined){
            return styles[i];
        }
    }
}
4. assert(getCorrectStyle()?.backgroundColor === 'yellow');
5. You should have a text color of `red` on your descendants.
6. const styles = [styleOne, styleTwo, styleThree, styleFour];
7. function getCorrectStyle(){
    for(let i = 0; i < styles.length; i++){
        if(styles[i] != undefined){
            return styles[i];
        }
    }
}
8. assert(getCorrectStyle()?.color === 'red');
9. You should have a font size of `20px` on your descendants.
10. const styles = [styleOne, styleTwo, styleThree, styleFour];
11. function getCorrectStyle(){
    for(let i = 0; i < styles.length; i++){
        if(styles[i] != undefined){
            return styles[i];
        }
    }
}
12. assert(getCorrectStyle()?.fontSize === '20px');
13. You should center align the text on your descendants.
14. const styles = [styleOne, styleTwo, styleThree, styleFour];
15. function getCorrectStyle(){
    for(let i = 0; i < styles.length; i++){
        if(styles[i] != undefined){
            return styles[i];
        }
    }
}
16. assert(getCorrectStyle()?.textAlign === 'center');

## Solution

```html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Descendant Combinator</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="container">
      <p class="text">This should be styled.</p>
    </div>
    <p class="text">This should be unstyled.</p>
    <p class="text">This should be unstyled.</p>
    <div class="container">
      <p class="text">This should be styled.</p>
      <p class="text">This should be styled.</p>
    </div>
  </body>
</html>
```

```css
.container .text {
  background-color: yellow;
  color: red;
  font-size: 20px;
  text-align: center;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee3ff8381756f9716727f3*
