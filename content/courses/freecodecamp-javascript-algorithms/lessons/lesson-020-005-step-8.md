---
id: lesson-020-005
title: Step 8
chapterId: chapter-20
order: 5
duration: 5
objectives:
  - Step 8
---

# Step 8

It is a common convention to place `import` statements at the top of your code. And additionally, in case of multiple `import` statements, sort them in alphabetical order to improve readability.

At the top of your code, import the `random` module.

## Starter Code

```html
--fcc-editable-region--
import string
--fcc-editable-region--

# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation

# Combine all characters
all_characters = letters + digits + symbols

print(all_characters)
```

## Hints

1. You should import the `random` module.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65646ffeaed2d238c562a014*
