---
id: lesson-020-013
title: Step 6
chapterId: chapter-20
order: 13
duration: 5
objectives:
  - Step 6
---

# Step 6

Your `all_characters` variable is a string formed by all lowercase and uppercase letters, all the 10 digits and several special characters. 

Just before it, add a comment saying `Combine all characters`.

## Starter Code

```html
--fcc-editable-region--
import string


# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation


all_characters = letters + digits + symbols
--fcc-editable-region--
```

## Hints

1. You should add the comment just above your `all_characters` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564883669b5af4b69f794cc*
