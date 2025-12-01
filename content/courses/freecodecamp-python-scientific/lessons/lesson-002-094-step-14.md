---
id: lesson-002-094
title: Step 14
chapterId: chapter-02
order: 94
duration: 5
objectives:
  - Step 14
---

# Step 14

The first kind of cipher you are going to build is called a *Caesar* cipher.  Specifically, you will take each letter in your message, find its position in the alphabet, take the letter located after 3 positions in the alphabet, and replace the original letter with the new letter.

To implement this, you will use the `.find()` method discussed in the previous step. Modify your existing `.find()` call passing it `text[0]` as the argument instead of `'z'`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
alphabet.find('z')
--fcc-editable-region--
```

## Hints

1. You should modify your existing `alphabet.find('z')` call passing `text[0]` to the method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6624e0ec0bf47017eed84b1f*
