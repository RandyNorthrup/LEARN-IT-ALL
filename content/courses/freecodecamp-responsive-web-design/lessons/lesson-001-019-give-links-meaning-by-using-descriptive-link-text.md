---
id: lesson-001-019
title: Give Links Meaning by Using Descriptive Link Text
chapterId: chapter-01
order: 19
duration: 5
objectives:
  - Give Links Meaning by Using Descriptive Link Text
---

# Give Links Meaning by Using Descriptive Link Text

Screen reader users have various options for what type of content their device reads. These options include skipping to (or over) landmark elements, jumping to the main content, or getting a page summary from the headings. Another option is to only hear the links available on a page.

Screen readers do this by reading the link text, or what's between the anchor (`a`) tags. Having a list of "click here" or "read more" links isn't helpful. Instead, use brief but descriptive text within the `a` tags to provide more meaning for these users.

## Instructions

The link text that Camper Cat is using is not very descriptive without the surrounding context. Move the anchor (`a`) tags so they wrap around the text `information about batteries` instead of `Click here`.

## Starter Code

```html
<body>
  <header>
    <h1>Deep Thoughts with Master Camper Cat</h1>
  </header>
  <article>
    <h2>Defeating your Foe: the Red Dot is Ours!</h2>
    <p>Felines the world over have been waging war on the most persistent of foes. This red nemesis combines both cunning stealth and lightning speed. But chin up, fellow fighters, our time for victory may soon be near. <a href="">Click here</a> for information about batteries</p>
  </article>
</body>
```

## Hints

1. Your code should move the anchor `a` tags from around the words `Click here` to wrap around the words `information about batteries`.
2. The `a` element should have an `href` attribute with a value of an empty string `""`.
3. The `a` element should have a closing tag.

## Solution

```html
```html
<body>
  <header>
    <h1>Deep Thoughts with Master Camper Cat</h1>
  </header>
  <article>
    <h2>Defeating your Foe: the Red Dot is Ours!</h2>
    <p>Felines the world over have been waging war on the most persistent of foes. This red nemesis combines both cunning stealth and lightning speed. But chin up, fellow fighters, our time for victory may soon be near. Click here for <a href="">information about batteries</a></p>
  </article>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 587d778f367417b2b2512aae*
