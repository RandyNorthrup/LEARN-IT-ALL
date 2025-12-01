---
id: lesson-036-001
title: The Cascade of CSS Lesson A
chapterId: chapter-36
order: 1
duration: 5
objectives:
  - The Cascade of CSS Lesson A
---

# The Cascade of CSS Lesson A

Sometimes we may have rules that conflict with one another, and we end up with some unexpected results. “But I wanted these paragraphs to be blue, why are they red like these other paragraphs?!” As frustrating as this can be, it’s important to understand that CSS doesn’t just do things against your wishes. CSS only does what we tell it to do. One exception to this is the default styles that are provided by a browser. These default styles vary from browser to browser, and they are why some elements create a large “gap” between themselves and other elements, or why buttons look the way they do, despite us not writing any CSS rules to style them that way.

So if you end up with some unexpected behavior like this it’s either because of these default styles, not understanding how a property works, or not understanding this little thing called the cascade.

The cascade is what determines which rules actually get applied to your HTML. There are different factors that the cascade uses to determine this. We will examine three of these factors, which will hopefully help you avoid those frustrating “I hate CSS” moments.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489bcd7b7600c818dc297ea*
